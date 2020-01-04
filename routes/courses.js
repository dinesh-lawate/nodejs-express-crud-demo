const express = require("express");
const Joi = require("joi");
const courseCtlr = require("../controllers/courses")

const courseRouter = express.Router();


courseRouter.get("/", courseCtlr.getCourses);

courseRouter.post("/", courseCtlr.addCourse);

courseRouter.put("/:id", courseCtlr.updateCourse);

courseRouter.get("/:id", courseCtlr.getCourse);

courseRouter.delete("/:id", courseCtlr.deleteCourse);

module.exports = courseRouter;