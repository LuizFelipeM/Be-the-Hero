import * as Knex from "knex";

const tableName = 'incidents';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable(tableName, (table: Knex.CreateTableBuilder) => {
        table.increments();

        table.string('ong_id').notNullable();
        table.foreign('ong_id').references('id').inTable('ongs');

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable(tableName);
}

