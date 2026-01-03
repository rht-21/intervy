import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "@auth/core/adapters";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const INTERVIEW_MODE = pgEnum("INTERVIEW_MODE", [
  "technical",
  "behavioral",
  "mixed",
]);

export const INTERVIEW_STATUS = pgEnum("INTERVIEW_STATUS", [
  "active",
  "draft",
  "archived",
]);

export const INTERVIEW_DIFFICULTY = pgEnum("INTERVIEW_DIFFICULTY", [
  "beginner",
  "intermediate",
  "advanced",
]);

export const interview = pgTable("interview", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  interviewMode: INTERVIEW_MODE("interviewMode").notNull().default("technical"),
  interviewDifficulty: INTERVIEW_DIFFICULTY("interviewDifficulty")
    .notNull()
    .default("beginner"),
  lastPracticed: timestamp("lastPracticed", { mode: "date" }),
  interviewStatus: INTERVIEW_STATUS("interviewStatus")
    .notNull()
    .default("draft"),
  duration: integer("duration"),
  numberOfQuestions: integer("numberOfQuestions"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

export const interview_session = pgTable("interview_session", {
  id: serial("id").primaryKey(),
  interviewId: integer("interviewId")
    .notNull()
    .references(() => interview.id, { onDelete: "cascade" }),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  hasInterviewStarted: boolean("hasInterviewStarted").notNull().default(false),
  hasInterviewEnded: boolean("hasInterviewEnded").notNull().default(false),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});
