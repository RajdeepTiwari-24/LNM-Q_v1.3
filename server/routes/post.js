const router = require("express").Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const singleUpload = multer({ storage }).single("file");
const {getPosts, likeUnlikePost, getSpecificPost, addPost, deletePost, uploadImage} = require("../controllers/postControllers");

router.get("/allposts", getPosts);

router.post("/allposts", likeUnlikePost);

router.get("/allposts/:postId", getSpecificPost);

// router.post("/allposts/:postId", async (req, res, next) => {
//   try {
//     const postId = req.params.postId;
//     const userId = req.body.userId;
//     const post = await Post.findOne({ _id: postId }).populate("replies");
//     if (!post) {
//       return res.status(404).json({ status: false, msg: "Post not found" });
//     }
//     const index = post.likes.indexOf(userId);
//     if (index === -1) {
//       post.likes.push(userId);
//     } else {
//       post.likes.splice(index, 1);
//     }
//     await post.save();
//     return res.json({ status: true, likes: post.likes });
//   } catch (ex) {
//     next(ex);
//   }
// });

router.post("/addpost", addPost);

router.post("/uploadpost", singleUpload, uploadImage);

router.post("/deletepost", deletePost);

module.exports = router;
