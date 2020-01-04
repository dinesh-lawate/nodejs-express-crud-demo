const people = [
    { name: "Dinesh", city: "Navi Mumbai" },
    { name: "Michelle", city: "New York" },
    { name: "James", city: "Godric" },
    { name: "Sam", city: "Florida" }
]

const getPeople = (req, res) => {
    res.send(people);
}

module.exports = { getPeople };