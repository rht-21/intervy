import { db } from "@/database/drizzle";
import { interview } from "@/database/schema";
import { and, asc, desc, eq, ilike, ne } from "drizzle-orm";
import { auth } from "@/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const scope = req.headers.get("x-interview-scope") ?? "own";
    const userId = searchParams.get("userId");
    const limit = Math.min(Number(searchParams.get("limit")) || 20, 100);
    const offset = Number(searchParams.get("offset")) || 0;
    const search = searchParams.get("search");

    type InterviewStatus =
      (typeof interview.interviewStatus.enumValues)[number];
    type InterviewMode = (typeof interview.interviewMode.enumValues)[number];
    type InterviewDifficulty =
      (typeof interview.interviewDifficulty.enumValues)[number];

    const rawStatus = searchParams.get("status");
    const rawMode = searchParams.get("mode");
    const rawDifficulty = searchParams.get("difficulty");

    const status: InterviewStatus | undefined =
      scope == "others"
        ? "active"
        : rawStatus &&
          interview.interviewStatus.enumValues.includes(
            rawStatus as InterviewStatus
          )
        ? (rawStatus as InterviewStatus)
        : undefined;

    const mode: InterviewMode | undefined =
      rawMode &&
      interview.interviewMode.enumValues.includes(rawMode as InterviewMode)
        ? (rawMode as InterviewMode)
        : undefined;

    const difficulty: InterviewDifficulty | undefined =
      rawDifficulty &&
      interview.interviewDifficulty.enumValues.includes(
        rawDifficulty as InterviewDifficulty
      )
        ? (rawDifficulty as InterviewDifficulty)
        : undefined;

    // ---------- SORTING ----------

    const sortField =
      searchParams.get("sort") === "lastPracticed"
        ? interview.lastPracticed
        : interview.updatedAt;

    const sortOrder =
      searchParams.get("order") === "asc" ? asc(sortField) : desc(sortField);

    // ---------- OWNERSHIP SCOPE ----------
    const ownershipCondition =
      userId && scope === "own"
        ? eq(interview.userId, userId)
        : userId && scope === "others"
        ? ne(interview.userId, userId)
        : undefined;

    // ---------- CONDITIONS ----------

    const conditions = [
      ownershipCondition,
      status ? eq(interview.interviewStatus, status) : undefined,
      mode ? eq(interview.interviewMode, mode) : undefined,
      difficulty ? eq(interview.interviewDifficulty, difficulty) : undefined,
      search ? ilike(interview.name, `%${search}%`) : undefined,
    ].filter(Boolean);

    // ---------- QUERY ----------

    const interviews = await db
      .select({
        id: interview.id,
        name: interview.name,
        interviewMode: interview.interviewMode,
        interviewDifficulty: interview.interviewDifficulty,
        interviewStatus: interview.interviewStatus,
        numberOfQuestions: interview.numberOfQuestions,
        lastPracticed: interview.lastPracticed,
        updatedAt: interview.updatedAt,
      })
      .from(interview)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(sortOrder)
      .limit(limit)
      .offset(offset);

    // ---------- RESPONSE ----------

    return Response.json({
      data: interviews,
      meta: {
        limit,
        offset,
        count: interviews.length,
        scope,
      },
    });
  } catch (error) {
    console.error("GET /api/interviews error:", error);

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const {
      name,
      interviewMode,
      interviewDifficulty,
      duration,
      numberOfQuestions,
    } = body;

    // ---- BASIC VALIDATION ----
    if (!name || typeof name !== "string") {
      return Response.json(
        { error: "Interview name is required" },
        { status: 400 }
      );
    }

    // ---- ENUM SAFETY ----
    type InterviewMode = (typeof interview.interviewMode.enumValues)[number];
    type InterviewDifficulty =
      (typeof interview.interviewDifficulty.enumValues)[number];

    const mode: InterviewMode = interview.interviewMode.enumValues.includes(
      interviewMode
    )
      ? interviewMode
      : "technical";

    const difficulty: InterviewDifficulty =
      interview.interviewDifficulty.enumValues.includes(interviewDifficulty)
        ? interviewDifficulty
        : "beginner";

    // ---- INSERT ----
    const [createdInterview] = await db
      .insert(interview)
      .values({
        name,
        userId: session.user.id,
        interviewMode: mode,
        interviewDifficulty: difficulty,
        duration: duration ? Number(duration) : null,
        numberOfQuestions: numberOfQuestions ? Number(numberOfQuestions) : null,
      })
      .returning({
        id: interview.id,
        name: interview.name,
        interviewMode: interview.interviewMode,
        interviewDifficulty: interview.interviewDifficulty,
        interviewStatus: interview.interviewStatus,
        numberOfQuestions: interview.numberOfQuestions,
        createdAt: interview.createdAt,
      });

    return Response.json({ data: createdInterview }, { status: 201 });
  } catch (error) {
    console.error("POST /api/interviews error:", error);

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id");

    const id = Number(idParam);

    if (!id || Number.isNaN(id)) {
      return Response.json(
        { error: "Valid interview id is required" },
        { status: 400 }
      );
    }

    const deleted = await db
      .delete(interview)
      .where(eq(interview.id, id))
      .returning({
        id: interview.id,
      });

    if (deleted.length === 0) {
      return Response.json({ error: "Interview not found" }, { status: 404 });
    }

    return Response.json({ success: true, id }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/interviews error:", error);

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      id,
      name,
      interviewStatus,
      interviewMode,
      interviewDifficulty,
      duration,
      numberOfQuestions,
    } = body;

    if (!id) {
      return Response.json(
        { error: "Interview id is required" },
        { status: 400 }
      );
    }

    // ---- ENUM SAFETY ----

    if (
      interviewMode &&
      interviewStatus &&
      !interview.interviewMode.enumValues.includes(interviewMode)
    ) {
      return Response.json(
        { error: "Invalid interview mode" },
        { status: 400 }
      );
    }

    if (
      interviewDifficulty &&
      !interview.interviewDifficulty.enumValues.includes(interviewDifficulty)
    ) {
      return Response.json(
        { error: "Invalid interview difficulty" },
        { status: 400 }
      );
    }

    // ---- UPDATE ----

    const updated = await db
      .update(interview)
      .set({
        name,
        interviewStatus,
        interviewMode,
        interviewDifficulty,
        duration: duration ? Number(duration) : undefined,
        numberOfQuestions: numberOfQuestions
          ? Number(numberOfQuestions)
          : undefined,
        updatedAt: new Date(),
      })
      .where(and(eq(interview.id, id), eq(interview.userId, session.user.id)))
      .returning({
        id: interview.id,
      });

    if (!updated.length) {
      return Response.json({ error: "Interview not found" }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("PATCH /api/interviews error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
