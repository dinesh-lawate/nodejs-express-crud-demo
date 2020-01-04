function getHome(req, res) {
    res.render("index", { title: "My Express App", message: "Introduction to Express MVC app" });
}

module.exports = { getHome }