const express = require("express");
const bodyParser = require("body-parser");
const connect = require("./config/DB")
const userRouter = require("./router/userRouter")
const postRouter = require("./router/postRouter");
const errorMiddleware = require("./middleware/error")
require('dotenv').config();

const app = express();

connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1/user",userRouter);
app.use("/api/v1/post",postRouter);
app.use(errorMiddleware);

app.get("/api", (req, res, next) => {
  const err = new Error('something went wrong');
  err.statusCode = 400; 
  next(err); 
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
