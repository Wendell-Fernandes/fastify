import cookie from '@fastify/cookie'
import Fastify, { type FastifyInstance } from 'fastify'
import { TransactionsRoutes } from './routes/transactions.js'

export const fastify: FastifyInstance = Fastify()

fastify.register(cookie)
fastify.register(TransactionsRoutes, { prefix: 'transactions' })
