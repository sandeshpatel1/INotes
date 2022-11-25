var jwt = require('jsonwebtoken');
JWT_SECRET = "HELLOTHISISMYAUTHTOKEN";

fetchUser = (req ,res, next)=>{
    //GET YHE USER FROM JWT TOKEN AND ADD ID TO REQ OBJECT//
    const token = req.header("auth-token");
    if (!token){
        return res.status(401).send({error : "Please authenticate using Valid Token"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
    } catch (error) {
        return res.status(401).send({error : "Please authenticate using Valid Token"})
    }
    
    next()
}


module.exports = fetchUser;