var express = require("express");
var router = express.Router();
const QueryPromise = require("../database/dbService");

const sendAll = (res) => {
  QueryPromise("SELECT * FROM plant_core")
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      res.send(err);
    });
};

/* GET plants listing. */
router.get("/", (req, res, next) => sendAll(res));

router.get("/filter", (req, res, next) => {
  let queryParams = req.query;
  let numParams = Object.keys(queryParams).length;
  let filter = Object.keys(queryParams).reduce((prev, cur, idx) => {
    let comparison = `${cur} = ${queryParams[cur]}`;
    return idx == numParams - 1
      ? prev + comparison
      : prev + comparison + " AND ";
  }, "");
  QueryPromise(
    `SELECT * FROM plant_core
    WHERE ${filter}`
  )
    .then((results) => {
      res.send(results);
    })
    .catch((err) => res.send(err));
});

//string search route. for all string fields, see if key word is contained look up how to do this

// router.get("/all", (req, res, next) => {
//   let bloom_filter = req.query.bloom ? req.query.bloom : null; //string
//   let cat_filter = req.query.category ? req.query.category : "(4,6,8,14,13,3)"; //need a better way to include all categorys if this parameter is omitted.
//   //also have to filter by category (natural join by category )
//   // there must be an easier way to do this....
//   console.log(bloom_filter);
//   QueryPromise(
//     `SELECT * FROM plant_core
//     WHERE ((${bloom_filter} IS NULL) OR (bloom_months = ${bloom_filter}))
//     AND (category_id IN ${cat_filter})`
//   )
//     .then((results) => {
//       res.send(results);
//     })
//     .catch((err) => res.send(err));
// });

/* GET specific plant */
router.get("/:id", function (req, res, next) {
  //res.send("respond with a resource");
  QueryPromise("SELECT * FROM plant_core WHERE plant_id = ?", [req.params.id])
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
