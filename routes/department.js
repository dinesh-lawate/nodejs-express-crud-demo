const express = require("express");
const Joi = require("joi");
const departmentCtrl = require("../controllers/department")

const departmentRouter = express.Router();


departmentRouter.get("/", departmentCtrl.getDepartments);

departmentRouter.post("/", departmentCtrl.addDepartment);

departmentRouter.put("/:id", departmentCtrl.updateDepartment);

departmentRouter.get("/:id", departmentCtrl.getDepartment);

departmentRouter.delete("/:id", departmentCtrl.deleteDepartment);

module.exports = departmentRouter;