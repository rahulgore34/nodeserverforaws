const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        // get token from header
        const token = req.headers.authorization.split(" ")[1];
        // verfiy 
        const decodedToken = jwt.verify(token, process.env.SECRETE_KEY);
        req.body.userId = decodedToken.userId;
        next();
    } catch (error) {
        res.json({
            success: false,
            message: error?.message
        })
    }
}