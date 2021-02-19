const express = require('express');
const router = express.Router();
const mysqlConnection = require('../mysqlConnection');
const dayjs = require('dayjs')

//寄付記録INSERT
router.post("/", async function(req, res, next){

    const { user_id, group_name, money, date, nations} = req.body
    let insertQuery = `INSERT INTO donation_record (user_id, group_name, money, date, nations, created_at) VALUES`;

    try {
        let queryValues ;
        for(let i = 0; i < nations.length; i++){
            queryValues = `(${user_id}, '${group_name}', ${money}, '${date}', ${nations[i]}, NOW())${i == nations.length -1 ? ";" : "," }`
            insertQuery += queryValues
        }
        
        await mysqlConnection.query(insertQuery)
        res.json({message : 'Success'});
    } catch (error) {
        return next(error)
    }
})

module.exports = router;