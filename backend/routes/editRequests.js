var express = require('express');
var router = express.Router();
const QueryPromise = require("../database/dbService");

/* POST new DB entry form */
router.post("/entry", (req, res, next) => {
    // Split the entries object into its individual parts

    // INSERT INTO request_forms (columns from request form table) VALUES (entries object parts)
    QueryPromise("")
        .then((results) => {
            res.send(results);
        })
        .catch((err) => {
            res.send(err);
        })
    
})

/* POST new DB edit request form */
router.post("/edit", (req, res, next) => {
    
})

module.exports = router;