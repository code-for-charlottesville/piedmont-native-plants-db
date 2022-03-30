var express = require('express');
var router = express.Router();
const QueryPromise = require('../database/dbService');

const sendAll = (res) => {
  QueryPromise("SELECT * FROM plant_core")
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      res.send(err);
    });
}

/* GET plants listing. */
router.get('/', (req, res, next) => sendAll(res));
router.get("/all", (req, res, next) => sendAll(res));

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

