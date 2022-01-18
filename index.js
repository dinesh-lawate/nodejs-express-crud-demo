const express = require("express");
const jwt = require('express-jwt');
var jwks = require('jwks-rsa');
const morgan = require("morgan");
const helmet = require('helmet');
const config = require("config");
const debug = require("debug")("app:all");
// const debugDb = require("debug")("db:all");
const cors = require("cors");

const posts = require("./routes/posts");
const courses = require("./routes/courses");
const people = require("./routes/people");
const home = require("./routes/home");
const employee = require('./routes/employee');
const department = require('./routes/department')
const logger = require("./middleware/customeMiddleware");

const app = express();

debug(`Environment : ${app.get("env")}`);

if (app.get("env") === "development") {
    //Logging API using morgan
    app.use(morgan());
    debug("Morgan enabled...");
}

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.static("public"));
// app.use(logger);
//Secures express app by setting various HTTP Headers
app.use(helmet());
debug("Helmet enabled...");

//Setting up CORS
app.use(cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*"
}));

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-cod0w274.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://nodejs.auth0.api',
    issuer: 'https://dev-cod0w274.auth0.com/',
    algorithms: ['RS256']
});

app.use(jwtCheck);

//Using config package
const dbConfig = config.get('Customer.dbConfig');
debug(dbConfig);

app.use("/api/courses", courses);
app.use("/api/posts", posts);
app.use("/api/people", people);
app.use("/api/employees", employee);
// app.use("/api/employees", employee);
app.use("/api/departments", department);
app.use("/", home);

//Read environment vairable
const port = process.env.PORT || 3010;

app.listen(port, () => {
    debug(`Listening on port ${port}...`);
});
