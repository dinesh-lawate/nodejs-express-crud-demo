const express = require("express");
const peopleCtrl = require("../controllers/people")
const peopleRouter = express.Router();

peopleRouter.get("/", peopleCtrl.getPeople);

module.exports = peopleRouter;