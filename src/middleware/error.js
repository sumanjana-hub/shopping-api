const errorhandler = require("../utils/errorhandler")


module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";


  
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new errorhandler(message, 400);
  }

  
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new errorhandler(message, 400);
  }


  res.status(err.statusCode).json({
    success: false,
    status: err.statusCode,
    message: err.message,
  });
};