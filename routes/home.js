const express = require("express");
const homeCtrl = require("../controllers/home")
const homeRouter = express.Router();

homeRouter.get("/", homeCtrl.getHome);

module.exports = homeRouter;