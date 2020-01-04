function getPosts(req, res) {
    res.send(req.params);
}

module.exports = { getPosts };