const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;
const User = require("../models/user");

exports.isAdmin = (...roles) => {
    return (req, res, next) => {
      try {
        if (!roles.includes(req.user.role)) {
          return res.status(403).json({ message: "You are not authorized to access this route" });
        }
        next();
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
      }
    };
  };
  
