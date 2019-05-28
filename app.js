const signinRouter = require("./api/routes/signin");
const sinupRouter = require("./api/routes/signup");
const cookieParser = require("cookie-parser");
const user = require("./api/routes/user");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const express = require("express");
const dotEnv = require('dotenv');
const morgan = require('morgan');
const mySql = require("mysql");
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;

dotEnv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log("connected!");
});

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//routing
app.use("user", user);
app.use("/api/v1/user", sinupRouter);
app.use("/api/v1/user", signinRouter);

app.get("/sign", function (req, res) {
    res.send("hello world");
});



app.use((req, res, next) => {
    const error = new Error("Not found!");
    error.status = 500;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.mesaage
        }
    })
});

app.listen(port, () => {
    console.log(`server is running on ${port}`);
});


module.exports = app;