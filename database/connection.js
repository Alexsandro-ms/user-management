var knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: 'localhost', // nome do serviço no docker-compose.yml
    user: 'root',
    password: 'password', // senha definida no docker-compose.yml
    database: 'mydatabase' // nome do banco de dados definido no docker-compose.yml
  },
  // pool: {
  //   min: 2,
  //   max: 10
  // },
  // acquireConnectionTimeout: 5000, // tempo limite para conexão
  // migrations: {
  //   tableName: 'knex_migrations'
  // }
});

module.exports = knex;
