const DB = require("./dbConfig");

const queryDB = (sql, params=[]) => {
    return new Promise((success, reject) => {
        DB.then(con => {
          con.execute(sql, params, (err, results, fields) => {
            if (err) {
              reject(err);
            } else success(results);
          });
        }).catch(err => reject(err));
    });
}

module.exports = queryDB;
