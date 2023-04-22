var express = require('express');
var router = express.Router();
const QueryPromise = require("../database/dbService");

/* POST new DB entry form */
router.post("/entry", (req, res, next) => {
    // Take the values from the request body and put them into an array
    // This will make writing the DB query easier because the array is already made
    const requestValues = Object.values(req.body);

    // INSERT INTO request_forms (columns from request form table) VALUES (entries object parts)
    QueryPromise("INSERT INTO db_edit_requests SET ?", [requestValues])
        .then((results) => {
            res.send(results);
        })
        .catch((err) => {
            res.send(err);
        })
    
})

/* POST new DB edit request form */
router.post("/edit", (req, res, next) => {

    //collect data from req.body

    // INSERT INTO request_forms (columns from update request form table) VALUES (entries)
    QueryPromise("")
        .then((results) => {
            res.send(results);
        })
        .catch((err) => {
            res.send(err);
        })
})

module.exports = router;