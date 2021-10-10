const Pool = require('pg').Pool;
const dotenv = require('dotenv');
dotenv.config();

console.log(process.env.HOST);

const pool = new Pool({
  user: process.env.USER_DB,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

exports.execQuery = async (query) => {
  return new Promise((resolve) => {
    pool.query(query, (error, results) => {
      if (error) {
        throw error
      }
      resolve(results.rows) 
    })
  })
};

