import SQLite from 'better-sqlite3'
import { Kysely, PostgresDialect, SqliteDialect } from 'kysely'
import Pool from 'pg-pool'
import { env } from '../../../environment/env.config.js'
import type { Database } from './types.ts'

export let dialect: SqliteDialect | PostgresDialect

if (env.DATABASE_CLIENT === 'sqlite') {
	dialect = new SqliteDialect({
		database: new SQLite(env.DATABASE_URL),
	})
} else {
	dialect = new PostgresDialect({
		pool: new Pool({
			connectionString: env.DATABASE_URL,
		}),
	})
}

export const kysely = new Kysely<Database>({
	dialect,
})
