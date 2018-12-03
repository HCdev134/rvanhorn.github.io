let mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'v02yrnuhptcod7dk.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'ouom17w26jkhujqv',
  password: process.env.DB_PASSWORD,
  database: 'k0exve3vxrd945sc',
});

connection.connect((err) => {

  if (err) {

    console.error(`error connecting: ${err.stack}`);
    return;

  }

  console.log(`connected as id ${connection.threadId}`);

});

module.exports = connection;
