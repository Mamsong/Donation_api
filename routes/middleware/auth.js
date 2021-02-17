const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = ((req, res, next) => {
    if(!req.headers.token){
        next(new Error('Invalid Request, Token was not found'));
        return;
    }
    const tokenReceived = req.headers.token;

    try {
        //tokenを復号化。暗号が改竄されていたらエラー。
        const validToken = jwt.verify(tokenReceived, process.env.JWT_SECRET);
        //userIDがわかるようにrequestに復号化されたtokenのuidを入れる。
        req.user_id = validToken.userId;
        next();
    } catch (error) {
        res.status(401).send('再度ログインしてください');
    }
})

module.exports = authenticate;