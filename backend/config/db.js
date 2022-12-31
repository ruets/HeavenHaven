const { Client } = require('pg')
 
exports.client = new Client({
  host: 'localhost',
  database: 'testSAE3',
  port: 5432,
  user: 'testSAE3',
  password: 'test',
});