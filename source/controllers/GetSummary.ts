import type { UUID } from 'node:crypto'
import type { FastifyRequest } from 'fastify'
import { kysely } from '../database/kysely/index.js'

export async function GetSummary(request: FastifyRequest) {
	const sessionID = request.cookies.sessionID

	const summary = await kysely
		.selectFrom('transactions')
		.where('session_id', '=', sessionID as UUID)
		.select((eb) => eb.fn.sum('amount').as('amount'))
		.executeTakeFirst()

	return { summary }
}
