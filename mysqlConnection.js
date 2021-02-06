const mysql = require('mysql');
const util = require('util');
require('dotenv').config();
//dotenvでenvファイルの読み込みを可能にする

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DB
})

connection.query = util.promisify(connection.query)

module.exports = connection;