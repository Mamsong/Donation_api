const express = require('express');
const router = express.Router();
const mysqlConnection = require('../mysqlConnection');
const dayjs = require('dayjs')

//寄付記録INSERT
router.post("/", async function(req, res, next){

    const { user_id, group_name, money, date, nations} = req.body

    try {
        const insertQuery = "INSERT INTO donation_record SET user_id = ?, group_name = ?, money = ?,  date = ?, nations = ?, created_at = NOW()";
        await mysqlConnection.query(insertQuery,[user_id,group_name,money,date,nations])
        res.json({message : 'Success'});
    } catch (error) {
        return next(error)
    }
})

module.exports = router;