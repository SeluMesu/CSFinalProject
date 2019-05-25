const signinRouter = require("./routes/signin");
const sinupRouter = require("./routes/signup");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const express = require("express");
const dotEnv = require('dotenv');
const mySql = require("mysql");
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;

dotEnv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log("connected!");
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//routing
app.use("/api/v1/user", signinRouter);
app.use("/api/v1/user", sinupRouter);

app.get("/api", function (req, res) {
    res.send("hello world");
});
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});


module.exports = app;