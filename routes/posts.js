const express = require("express");
const postsCtrl = require("../controllers/posts")
const postsRouter = express.Router();

postsRouter.get("/:year/:month", postsCtrl.getPosts);

module.exports = postsRouter;