import { db } from "@/database/drizzle";
import { interview, interview_session } from "@/database/schema";
import { and, count, eq } from "drizzle-orm";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // ---------- TOTAL INTERVIEWS CREATED ----------
    const [totalResult] = await db
      .select({ value: count() })
      .from(interview)
      .where(eq(interview.userId, userId));

    // ---------- INTERVIEWS COMPLETED ----------
    const [completedResult] = await db
      .select({ value: count() })
      .from(interview_session)
      .where(
        and(
          eq(interview_session.userId, userId),
          eq(interview_session.hasInterviewEnded, true)
        )
      );

    return Response.json({
      data: {
        totalInterviews: totalResult.value ?? 0,
        completedInterviews: completedResult.value ?? 0,
      },
    });
  } catch (error) {
    console.error("GET /api/interviews/getInterviewStats error:", error);

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
