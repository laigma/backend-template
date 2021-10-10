'use strict';
const serviceBBDD = require('../Services/ServiceBBDD/serviceBBDD');
const dotenv = require('dotenv');
dotenv.config();

exports.getRoute = async function (args, res) {
  res.setHeader('Content-Type', 'application/json');
  let query = `SELECT * FROM table1`;
  console.log(query);
  let result = await serviceBBDD.execQuery(query);
  res.end(JSON.stringify(result));
};
exports.postRoute = async function (args, res) {
  res.setHeader('Content-Type', 'application/json');
  let query = 
    `INSERT INTO tabla1(campo1, campo2)
    VALUES(
      ${args.body.value.clave1},
      ${args.body.value.clave2}
    );`
  console.log(query);
  let result = await serviceBBDD.execQuery(query);
  res.end(JSON.stringify(result));
};
exports.putRoute = async function (args, res) {
  res.setHeader('Content-Type', 'application/json');
  let query = 
    `UPDATE tabla1
    SET campo1='${args.body.value.clave1}'
    WHERE campo2='${args.body.value.clave2}'`;
  console.log(query);
  let result = await serviceBBDD.execQuery(query);
  res.end(JSON.stringify(result));
};
exports.deleteRoute = async function (args, res) {
    res.setHeader('Content-Type', 'application/json');
    let query = 
      `DELETE FROM tabla1
      WHERE id=${args.id.value}`;
    console.log(query);
    let result = await serviceBBDD.execQuery(`DELETE FROM table1 WHERE id=${args.id.value}`)
    res.end(JSON.stringify(result));
};