const router = require("express").Router();
const {login,register,verify, deleteunverified} = require("../controllers/authControllers")

router.post("/login", login);

router.post("/register", register);

router.post("/verify", verify);

router.delete("/deleteunverified",deleteunverified);

module.exports = router;
