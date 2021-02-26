var express = require('express');
var router = express.Router();
const mysqlConnection = require('../mysqlConnection');

router.get('/:user_id/:already_got', async function(req, res, next){
    const { user_id, already_got } = req.params;
    try {
        // const selectQuery = `SELECT * FROM donation_record JOIN nations ON nations = nation_id WHERE user_id = ?`;
        const selectQuery = `SELECT * FROM donation_record JOIN nations ON nations = nation_id WHERE user_id = ? AND delete_flag = 0 ORDER BY date DESC LIMIT 4 OFFSET ?`;
        const data = await mysqlConnection.query(selectQuery,[ user_id, Number(already_got) ]);
        res.json(data);
    } catch (error) {
        return next(error);
    }
})

router.post('/delete', async function(req, res, next){
    // const { user_id } = req.params;
    const { record_id } = req.body;
    try {
        const updateQuery = `UPDATE donation_record SET delete_flag = 1 WHERE record_id = ?`;
        const data = await mysqlConnection.query(updateQuery,[record_id]);
        res.json({message : 'Success'});
    } catch (error) {
        return next(error);
    }
})

module.exports = router;