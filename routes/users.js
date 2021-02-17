var express = require('express');
var router = express.Router();
const mysqlConnection = require('../mysqlConnection');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/',async(req, res, next) => {
  const user_id = req.query.user_id;
  try {
      const query = "SELECT * FROM users WHERE user_id = ?";
      const data = await mysqlConnection.query(query,[user_id]);
      res.json(data)
  } catch (error) {
      return next(err);
  }
})

//ログインしているユーザー自身のデータ
//ログインしている時tokenから
router.get('/self', async(req, res, next)=>{
  const user_id = req.user_id
  try {
    const query = "SELECT * FROM users WHERE user_id = ?";
      const data = await mysqlConnection.query(query,[user_id]);
      res.json(data);
  } catch (error) {
    return next(error);
  }
})


//新規登録
router.post('/signup',async function(req, res, next){
  const { username, email, password} = req.body
  
  try {
    const selectQuery = "SELECT COUNT(*) as emailAdress FROM users WHERE email = ?";
    const data = await mysqlConnection.query(selectQuery,[email])
    if(data[0].emailAdress > 0){
      res.json({message: '既に登録されているメールアドレスです。'});
    }else{
      const insertQuery = "INSERT INTO users(username,email,password,created_at) VALUES(?,?,?,NOW())";
      await mysqlConnection.query(insertQuery,[username,email,password])
      res.json({message: "Success"})
    }
  } catch (err) {
    console.log(err)
    return next(err)
  }
})

module.exports = router;
