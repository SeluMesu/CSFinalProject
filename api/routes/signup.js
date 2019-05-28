
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
    user.save()
        .then(result => {
            console.log(result);
            res.status(201)
                .json({
                    message: "Handling POST requests to /signup",
                    userCreated: result
                })
        }).catch(err => {
            console.log(err);
            res.status(500)
                .json({
                    error: {
                        message: err,
                    }
                });
        });


    // try {
    //     const savedUser = await user.save();
    //     res.send(savedUser);
    // } catch (err) {
    //     res.status(400).send(err)
    // }

});


router.get("/signup", (req, res, next) => {
    res.status(200).json({
        message: "This is where you should show your app."
    })
});

module.exports = router;
