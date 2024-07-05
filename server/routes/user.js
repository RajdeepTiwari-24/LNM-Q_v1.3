const router = require("express").Router();
const getUser = require("../controllers/userController");

router.get("/getuser/:userId", getUser);

module.exports = router;