const departmentsService = require('../service/departments');

async function getDepartments(req, res) {
    var fs = require('fs');
    let departments = await departmentsService.getDepartments();
    res.send(departments);
}

const getDepartment = (req, res) => {
}

const addDepartment = (req, res) => {
}

const updateDepartment = (req, res) => {
}

const deleteDepartment = (req, res) => {
}


module.exports = { getDepartment, getDepartments, addDepartment, updateDepartment, deleteDepartment };