var express = require('express');
var router = express.Router();
const mysqlConnection = require('../mysqlConnection');


// 全ての国名の取得（寄付記録作成画面のセレクトタブ）
router.get('/all', async function(req, res, next){
    //?name=Maguro&age=3というように書く
    try {
        const query = `SELECT * FROM nations`;
        const data = await mysqlConnection.query(query);
        res.json(data);
    } catch (error) {
        return next(error);
    }
})

module.exports = router;

