import { pgTable, varchar, serial, text } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview', {
    id: serial('id').primaryKey(),
    jsonMockResp: text('jsonMockresp').notNull(),
    jonPosition: varchar('jobPosition').notNull(),
    jonDescription: varchar('jobDescription').notNull(),
    jonExperience: varchar('jobExperience').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt'),
    mockId: varchar('mockId').notNull()
})