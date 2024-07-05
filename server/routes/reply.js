const router = require("express").Router();
const {addReply,deleteReply} = require("../controllers/replyControllers");


router.post("/addreply", addReply);


router.post("/deletereply", deleteReply);


module.exports = router;
