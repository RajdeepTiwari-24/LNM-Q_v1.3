const router = require("express").Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const singleUpload = multer({ storage }).single("file");
const {getPosts, likeUnlikePost, getSpecificPost, addPost, deletePost, uploadImage} = require("../controllers/postControllers");

router.get("/allposts", getPosts);

router.post("/allposts", likeUnlikePost);

router.get("/allposts/:postId", getSpecificPost);

router.post("/addpost", addPost);

router.post("/uploadpost", singleUpload, uploadImage);

router.delete("/deletepost", deletePost);

module.exports = router;
