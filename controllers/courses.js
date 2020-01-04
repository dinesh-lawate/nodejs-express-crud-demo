const Joi = require("joi");

const courses = [
    { id: 1, name: "Course 1" },
    { id: 2, name: "Course 2" },
    { id: 3, name: "Course 3" }
]

const getCourses = (req, res) => {
    res.send(courses);
}

const addCourse = (req, res) => {
    const { error } = validateCourse(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
}

const updateCourse = (req, res) => {
    const course = courses.find(course => course.id === +req.params.id);
    if (!course) {
        res.status(404).send("The course with the given ID is not found.");
        return;
    }

    const { error } = validateCourse(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);
}

const getCourse = (req, res) => {
    const course = courses.find(course => course.id === +req.params.id);
    if (!course) {
        res.status(404).send("The course with the given ID is not found.");
        return;
    }
    res.send(course);
}

const deleteCourse = (req, res) => {
    const course = courses.find(course => course.id === +req.params.id);
    if (!course) {
        res.status(404).send("The course with the given ID is not found.");
        return;
    }
    const deletedCourse = courses.splice(courses.indexOf(course), 1);
    res.send(deletedCourse);
}

const validateCourse = (body) => {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(body, schema);
}


module.exports = { getCourse, getCourses, addCourse, updateCourse, deleteCourse };