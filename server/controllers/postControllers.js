const Post = require("../models/postModel");
const User = require("../models/userModel");
const Reply = require("../models/replyModel");
const getDataUri = require("../utils/DataUri.js");
const cloudinary = require("cloudinary");
var Sentiment = require("sentiment");
var sentiment = new Sentiment();

const getPosts = async (req, res, next) => {
  try {
    //console.log('aaya');
    const allPosts = await Post.find().populate("userId");
    allPosts.reverse();
    //console.log(allPosts);
    return res.status(200).json(allPosts);
  } catch (ex) {
    next(ex);
  }
};

const likeUnlikePost = async (req, res, next) => {
  try {
    const { postId, userId } = req.body;
    const post = await Post.findOne({ _id: postId });
    if (!post) {
      return res.status(404).json({ status: false, msg: "Post not found" });
    }

    const index = post.likes.indexOf(userId);
    if (index === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(index, 1);
    }
    await post.save();
    return res.json({ status: true, likes: post.likes });
  } catch (ex) {
    next(ex);
  }
};

const getSpecificPost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findOne({ _id: postId }).populate("replies");
    if (!post) {
      return res.status(404).json({ status: false, msg: "Post not found" });
    }
    post.replies.reverse();
    return res.json({ post, status: true, msg: "Reply added successfully" });
  } catch (ex) {
    next(ex);
  }
};

const addPost = async (req, res, next) => {
  try {
    //console.log("Not upload image");
    const username = req.body.currusername;
    const userId = req.body.currUserId;
    const { text, topic } = req.body;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ status: false, msg: "User not found" });
    }
    var sentimentResult = sentiment.analyze(`${topic}:${text}`);
    if (sentimentResult.comparative < 0) {
      return res.json({ status: false, sentimentResult });
    }
    const post = await Post.create({
      text,
      topic,
      username,
      userId,
    });
    user.posts.push(post._id);
    await user.save();
    console.log(post);
    return res.json({ status: true, post });
  } catch (ex) {
    next(ex);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const postId = req.body.postId;
    const post = await Post.findOne({ _id: postId });
    if (!post) {
      return res.status(404).json({ status: false, msg: "Post not found" });
    }
    const userId = post.userId;
    await Reply.deleteMany({ _id: { $in: post.replies } });
    if (post.imageUrl) {
      const parts = post.imageUrl.split("/");
      const publicIdWithExtension = parts.pop();
      const publicId = publicIdWithExtension.split(".")[0];
      //console.log(publicId);
      const deleteresult = await cloudinary.v2.uploader.destroy(publicId);
    }
    await Post.deleteOne({ _id: postId });

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ status: false, msg: "User not found" });
    }
    user.posts = user.posts.filter((id) => id.toString() !== postId);
    await user.save();
    res.json({ status: true, msg: "Post deleted successfully" });
  } catch (ex) {
    next(ex);
  }
};

const uploadImage = async (req, res, next) => {
  try {
    // console.log("upload image");
    const username = req.body.currusername;
    const userId = req.body.currUserId;
    const { text, topic } = req.body;
    const file = req.file;
    const fileuri = getDataUri(file);
    const mycloud = await cloudinary.v2.uploader.upload(fileuri.content);
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ status: false, msg: "User not found" });
    }
    var sentimentResult = sentiment.analyze(`${topic}:${text}`);
    if (sentimentResult.comparative < 0) {
      return res.json({ status: false, sentimentResult });
    }
    const post = await Post.create({
      text,
      topic,
      username,
      imageUrl: mycloud.secure_url,
      userId,
    });
    user.posts.push(post._id);
    await user.save();

    return res.json({ status: true, post });
  } catch (ex) {
    next(ex);
  }
};
module.exports = {
  getPosts,
  likeUnlikePost,
  getSpecificPost,
  addPost,
  deletePost,
  uploadImage,
};
