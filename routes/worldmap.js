var express = require('express');
var router = express.Router();
const mysqlConnection = require('../mysqlConnection');

router.get("/:user_id", async function(req, res, next){
    const { user_id } = req.params;
    try {
        const selectQuery = `SELECT count(*) as action , sum(money) as sum, nations,nation_key,nation_name From donation_record JOIN nations ON nations = nation_id  WHERE user_id = ? GROUP BY nations`;
        const data = await mysqlConnection.query(selectQuery, [user_id]);
        res.json(data)
    } catch (error) {
        return next(error);
    }

})

module.exports = router;