const jwt = require("jsonwebtoken");

const jwt_secret = process.env.JWT_SECRET_KEY;

const verifyAuth = (req, res, next) => {

    let accessToken = req.headers['authorization'];
    accessToken = token.split(' ')[1];
    //const accessToken = req.cookie;
    console.log('accss token to verify is', accessToken);

    if (!accessToken) {
        return res.status(400).json({ message: 'access token not present'})
    }

    jwt.verify(accessToken, jwt_secret, (err, decode) => {

        if (err) {
            console.log("access token has expired!");
            return res.status(403).json({ message: "Access token expires!"})
        } else {


            next();
        }
    })
}

module.exports = verifyAuth;