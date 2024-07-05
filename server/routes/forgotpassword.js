const router = require("express").Router();
const {forgot, verifyJwt, update} = require("../controllers/forgotpasswordControllers");

router.post("/forgot",forgot);

router.get("/reset/:id/:token",verifyJwt);

router.post("/reset",update);

module.exports = router;