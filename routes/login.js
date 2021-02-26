var express = require('express');
var router = express.Router();
const mysqlConnection = require('../mysqlConnection');
// var passport = require('passport');

const jwt = require("jsonwebtoken");
const SECRET_KEY = "abcdefg"
//envにアクセスする
require('dotenv').config();

// TODO
// jsonwebtokenのmiddleware
// ログイン
router.post('/',async (req, res, next) => {
    // const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    try{
        // リクエストボディで送信されてきたusername, email, passwordのユーザーがDBに存在しているかを確認
        const query = `SELECT * FROM users WHERE email = ? and password = ?`;
        const loginUser = await mysqlConnection.query(query, [email, password]);

        // tokenにloginUserのusername,  emailを入れる
        // jsonwebtokenを生成するのにはsignを使う
        const token = jwt.sign({
            user_id: loginUser[0].user_id,
            email: loginUser[0].email,
            username: loginUser[0].username,
            expire: Math.floor(Date.now() / 1000) + 60 * 60
        }, process.env.JWT_SECRET); 
       
        // もし存在していれば、成功のレスポンスを返す(res.json({ message : 'Success' }))。
        // 存在していなければ、throw new Error('ユーザーが存在しません')を返す。
        if(loginUser.length != 0){
            res.json({message : 'Success', token: token});
        }else{
            res.json({ message : 'ユーザーが存在しません。' });
        }
    } catch(err){
        return next(err);
        // console.log(err)
    }
})

//エラーハンドリング
router.use((err, req, res, next) => {
    res.send(500, err)
})




module.exports = router