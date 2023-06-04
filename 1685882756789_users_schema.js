'use strict'

const Schema = use('Schema')

class UsersSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.bigIncrements('user_id')
      table.string('user_adi').notNullable()
      table.string('user_email').unique()
      table.specificType('user_password', 'binary')
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UsersSchema
