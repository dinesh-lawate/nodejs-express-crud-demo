const express = require("express");
const Joi = require("joi");
const employeeCtrl = require("../controllers/employee")

const employeeRouter = express.Router();


employeeRouter.get("/", employeeCtrl.getEmployees);

employeeRouter.post("/", employeeCtrl.addEmployee);

employeeRouter.put("/:id", employeeCtrl.updateEmployee);

employeeRouter.get("/:id", employeeCtrl.getEmployee);

employeeRouter.delete("/:id", employeeCtrl.deleteEmployee);

module.exports = employeeRouter;