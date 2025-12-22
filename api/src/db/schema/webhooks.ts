import { integer, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { uuidv7 } from 'uuidv7'

export const webhooks = pgTable('webhooks', {
    id: uuid()
        .primaryKey()
        .$defaultFn(() => uuidv7()),
    method: text().notNull(),
    path: text().notNull(),
    ip: text().notNull(),
    statusCode: integer().notNull().default(200),
    contentType: text(),
    contentLength: integer(),
    queryParams: jsonb().$type<Record<string, string>>(),
    headers: jsonb().$type<Record<string, string>>().notNull(),
    body: text(),
    createdAt: timestamp().notNull().defaultNow(),
})
