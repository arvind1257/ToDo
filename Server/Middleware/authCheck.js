import jwt from "jsonwebtoken"

export const AuthCheck = (req, res, next) => {
    try {
        var token = req.headers.authorization.split(" ");
        var decoded = jwt.verify(token[1], "test");
        req.userData = decoded._doc;
        next(); 
    } catch (err) {
        console.log("error");
        res.json({
            status:401,
            message: "Authentication Failed"
        });
    }
}
