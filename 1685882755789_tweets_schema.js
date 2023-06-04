'use strict'

const Schema = use('Schema')

class TweetsSchema extends Schema {
  up () {
    this.create('tweets', (table) => {
      table.bigIncrements('tweets_id') //
      table.string('img_url').notNullable()//
      table.bigInteger('user_id').notNullable()
      table.string('user_name').notNullable()//
      table.string('body').notNullable() //
      table.datetime('created_at').notNullable()//
    })
  }

  down () {
    this.drop('tweets')
  }
}

module.exports = TweetsSchema
