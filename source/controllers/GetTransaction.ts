import type { FastifyRequest } from 'fastify'
import * as zod from 'zod'
import { kysely } from '../database/kysely/index.js'

export async function GetTransaction(request: FastifyRequest) {
	const getTransactionsParamsSchema = zod.object({
		id: zod.string().uuid(),
	})

	const sessionID = request.cookies.sessionID || ''
	const { id } = getTransactionsParamsSchema.parse(request.params)

	const transaction = await kysely
		.selectFrom('transactions')
		.selectAll()
		.where('session_id', '==', sessionID)
		//@ts-ignore
		.where('id', '==', id)
		.executeTakeFirst()

	return { transaction }
}
