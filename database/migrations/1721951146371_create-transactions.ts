import type { Kysely } from 'kysely'

export async function up(database: Kysely<any>): Promise<void> {
	await database.schema
		.createTable('transactions')
		.addColumn('id', 'uuid', (col) => col.primaryKey().notNull())
		.addColumn('title', 'text', (col) => col.notNull())
		.addColumn('amount', 'decimal', (col) => col.notNull())
		.addColumn('created_at', 'text', (col) => col.notNull())
		.execute()
}

export async function down(database: Kysely<any>): Promise<void> {
	await database.schema.dropTable('transactions').execute()
}
