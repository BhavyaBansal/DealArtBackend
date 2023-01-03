const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // Bearer {TOKEN}
    if (!authHeader) {
      return res.status(401).json({
        err: "Authorization header not found",
      });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        err: "Token not found",
      });
    }
    const decoded = jwt.verify(token, "SECRET MESSAGE"); // this will give the object as payload in signin
    const user = await User.findOne({ where: { id: decoded.user.id } });
    if (!user) {
      return res.status(404).json({ err: "User Not Found" });
    }

    req.user = user;// taking care of performance by using same user in isSeller
    next();//call next function/middleware which is isSeller
  } catch (e) {
    return res.status(500).send(e);
  }
};
//Extending an Object same thing happens at line 23
/**
 * const a = {}
 * a.ewrer = 123
 * 
 * a = {ewrer:123}
 */

const isSeller = async (req, res, next) => {
    if(req.user.dataValues.isSeller){
        next();
    }else{
        return res.status(401).json({
            err:"You are not seller"
        })
    }
};

module.exports = {isAuthenticated,isSeller};
