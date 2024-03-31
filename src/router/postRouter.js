const express = require("express");
const {
  create,
  get,
  update,
  deletepost,
} = require("../controller/postController");

const routes = express.Router();

routes.post("/create", create);
routes.get("/get", get);
routes.put("/update", update);
routes.delete("/delete", deletepost);

module.exports = routes;
