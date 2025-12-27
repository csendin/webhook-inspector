import { eq } from 'drizzle-orm'
import { createSelectSchema } from 'drizzle-zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { db } from '@/db/connection'
import { webhooks } from '@/db/schema'

export const getWebhook: FastifyPluginAsyncZod = async (app) => {
    app.get(
        '/webhooks/:id',
        {
            schema: {
                summary: 'Get a specific webhook by ID',
                tags: ['Webhooks'],
                params: z.object({
                    id: z.uuid(),
                }),
                response: {
                    200: createSelectSchema(webhooks),
                    404: z.object({ message: z.string() }),
                },
            },
        },
        async (request, reply) => {
            const { id } = request.params

            const [result] = await db.select().from(webhooks).where(eq(webhooks.id, id)).limit(1)

            if (!result) return reply.status(404).send({ message: 'Webhook not found' })

            return reply.send(result)
        }
    )
}
