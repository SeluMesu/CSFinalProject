const router = require("express").Router();
const { signInValidation } = require('../validation');


router.post("/signin", (req, res, next) => {
    console.log(req.body);

    res.send("sign in page");
});

module.exports = router;
