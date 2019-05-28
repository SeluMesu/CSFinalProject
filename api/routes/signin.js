const { signInValidation } = require('../validation');
const router = require("express").Router();
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const bycrpt = require('bcryptjs');

router.post("/signin", async (req, res, next) => {
    const { error } = signUpValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check if the email is exited
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email or password incorrect!");

    //check if password is right
    const validatePass = await bycrpt.compare(req.body.password, user.password)
    if (!validatePass) return res.status(400).send("Email or password incorrect!")
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN);
    res.header('auth-token', token).send(token);
    res.send("successfully logged in!")
});

module.exports = router;
