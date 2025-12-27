import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { db } from '@/db/connection'
import { webhooks } from '@/db/schema'

export const deleteWebhook: FastifyPluginAsyncZod = async (app) => {
    app.delete(
        '/webhooks/:id',
        {
            schema: {
                summary: 'Delete a specific webhook by ID',
                tags: ['Webhooks'],
                params: z.object({
                    id: z.uuid(),
                }),
                response: {
                    204: z.void(),
                    404: z.object({ message: z.string() }),
                },
            },
        },
        async (request, reply) => {
            const { id } = request.params

            const [result] = await db.delete(webhooks).where(eq(webhooks.id, id)).returning()

            if (!result) return reply.status(404).send({ message: 'Webhook not found' })

            return reply.status(204).send()
        }
    )
}
