const Joi = require("joi");
const departmentService = require('../service/departments');

async function getEmployees(req, res) {
    var fs = require('fs');
    const util = require('util');
    // Convert fs.readFile into Promise version of same    
    const readFile = util.promisify(fs.readFile);

    let employees, departments, employeesWithDept;

    try {
        const employeesData = await readFile(__dirname + '/data/employees.json', 'utf8');
        employees = JSON.parse(employeesData);
        const departmentsData = await departmentService.getDepartments();
        departments = JSON.parse(departmentsData);

        employeesWithDept = employees.map(employee => {
            const dept = departments.find(department => department.id === employee.deptId);
            const manager = employees.find(emp => emp.id === employee.managerId);
            return {
                id: employee.id,
                name: employee.name,
                department: dept.name,
                manager: (manager && manager.name) ? manager.name : 'NA'
            }
        });
    } catch (error) {
        throw error;
    }

    res.send(employeesWithDept);
}

async function getEmployee(req, res) {
    var fs = require('fs');
    const util = require('util');
    // Convert fs.readFile into Promise version of same    
    const readFile = util.promisify(fs.readFile);
    let employees;
    const data = await readFile(__dirname + '/data/employees.json', 'utf8');
    employees = JSON.parse(data);
    const employee = employees.find(employee => employee.id === +req.params.id);
    if (!employee) {
        res.status(404).send("The employee with the given ID is not found.");
        return;
    }

    const departments = JSON.parse(await departmentService.getDepartments());
    const department = departments.find(department => department.id === employee.id);

    const employeeWithDept = {
        employee: {
            ...employee
        },
        department: {
            ...department
        }
    }
    res.send(employeeWithDept);
}

const addEmployee = (req, res) => {
    var fs = require('fs');
    let employees;
    fs.readFile(__dirname + '/data/employees.json', 'utf8', function (err, data) {
        if (err) throw err;
        employees = JSON.parse(data);
        const { error } = validateEmployee(req.body);

        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }

        const employee = {
            id: newId(employees),
            name: req.body.name,
            deptId: req.body.deptId,
            salary: req.body.salary,
            managerId: req.body.managerId
        }
        employees.push(employee);

        saveJsonData(fs, employees, function () {
            res.send(employee);
        });
    });
}

const updateEmployee = (req, res) => {
    var fs = require('fs');
    let employees;
    fs.readFile(__dirname + '/data/employees.json', 'utf8', function (err, data) {
        if (err) throw err;
        employees = JSON.parse(data);

        let employee = employees.find(employee => employee.id === +req.params.id)
        if (!employee) {
            res.send(404).send("The employee with the given Id not found.");
            return;
        }

        const { error } = validateEmployee(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }

        employee.name = req.body.name ? req.body.name : employee.name;
        employee.deptId = req.body.deptId ? req.body.deptId : employee.deptId;
        employee.salary = req.body.salary ? req.body.salary : employee.salary;
        employee.managerId = req.body.managerId ? req.body.managerId : employee.managerId;

        saveJsonData(fs, employees, function () {
            res.send(employee);
        });
    });
}

const deleteEmployee = (req, res) => {
    var fs = require('fs');
    let employees;
    fs.readFile(__dirname + '/data/employees.json', 'utf8', function (err, data) {
        if (err) throw err;
        employees = JSON.parse(data);
        const employee = employees.find(employee => employee.id === +req.params.id);
        if (!employee) {
            res.status(404).send("The employee with the given ID is not found.");
            return;
        }

        employees = employees.filter(employee => employee.id !== +req.params.id)

        saveJsonData(fs, employees, function () {
            res.send(employee);
        });
    });
}

const validateEmployee = (body) => {
    const schema = {
        name: Joi.string().min(3).required(),
        deptId: Joi.number(),
        salary: Joi.number(),
        managerId: Joi.number()
    };
    return Joi.validate(body, schema);
}

function saveJsonData(fs, employees, saveCallback) {
    fs.writeFile(__dirname + '/data/employees.json', JSON.stringify(employees), 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("JSON file has been saved.");
        saveCallback();
    });
}

function newId(input) {
    const arr = input.map(x => x.id)
    return Math.max.apply(null, arr) + 1;
}

module.exports = { getEmployee, getEmployees, addEmployee, updateEmployee, deleteEmployee };


