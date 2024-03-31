class ErrorHandler extends Error {
    constructor(statusCode, message) {
      super();
      this.statusCode = statusCode || 500;
      this.message = message || "Something went wrong";
    }
  
    static handle(err, req, res, next) {
      const { statusCode, message } = err instanceof ErrorHandler ? err : new ErrorHandler();
      console.error(err.stack);
      res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message,
      });
    }
  }
  
  module.exports = ErrorHandler;
  