// @ts-check
import { Knex } from 'knex';

module.exports.up = async function (knex: Knex) {
  return knex.schema
    .createTable('user', (table) => {
      table.increments('id', { primaryKey: true });
      table.string('email').unique().notNullable();
      table.string('firstname').notNullable();
      table.string('lastname').notNullable();
      table.string('password').notNullable();
      table.datetime('created_at').defaultTo(knex.fn.now()).notNullable();
      table.datetime('birth').notNullable();
      table.index(['email']);
    })
    .createTable('election', (table) => {
      table.increments('id', { primaryKey: true });
      table.string('name').unique().notNullable();
      table.string('description', 1024).notNullable();
      table.datetime('start_date');
      table.datetime('end_date');
      table
        .integer('organizer_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('user');
    })
    .createTable('vote', (table) => {
      table
        .integer('voter_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('user');
      table
        .integer('candidate_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('user');
      table
        .integer('election_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('election');
      table.datetime('created_at').defaultTo(knex.fn.now()).notNullable();
      table.primary(['voter_id', 'election_id']); // disallow multiple vote per election
      table.index(['voter_id', 'election_id']); // my votes
      table.index(['candidate_id', 'election_id']); // votes of candidate
    })
    .createTable('follow', (table) => {
      table
        .integer('follower_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('user');
      table
        .integer('followed_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('user');
      table.primary(['follower_id', 'followed_id']);
      table.index(['follower_id']);
      table.index(['followed_id']);
    });
};

module.exports.down = async function (knex: Knex) {
  knex.schema.dropTable('vote').dropTable('election').dropTable('user');
};
