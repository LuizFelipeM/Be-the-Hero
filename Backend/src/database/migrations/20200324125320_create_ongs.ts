import * as Knex from "knex";

const tableName = 'ongs';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable(tableName, (table: Knex.CreateTableBuilder) => {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    })
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable(tableName)
}