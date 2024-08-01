import type { Kysely } from 'kysely'

export async function up(database: Kysely<any>): Promise<void> {
	await database.schema.alterTable('transactions').addColumn('session_id', 'uuid').execute()
}

export async function down(database: Kysely<any>): Promise<void> {
	await database.schema.alterTable('transactions').dropColumn('session_id').execute()
}
