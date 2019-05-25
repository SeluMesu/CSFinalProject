
const { signUpValidation } = require('../validation');
const router = require("express").Router();
const User = require('../models/User');
const bycrpt = require('bcryptjs');


router.post("/signup", async (req, res, next) => {

    //validate data before we 
    const { error } = signUpValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //validate user email
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exist");
    // hash password
    const salt = await bycrpt.getSalt(10);
    const hashedPass = await bycrpt.hash(req.body.password, salt);
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err)
    }

});

module.exports = router;
