'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientsSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments('id')
      table.string('name', 64).notNullable()
      table.string('city', 64).notNullable()
      table.string('uf', 64).notNullable()
      table.date('birthday').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientsSchema
