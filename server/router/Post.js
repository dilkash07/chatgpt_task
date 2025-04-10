const express = require("express");
const router = express.Router();

const {
  createPost,
  getPost,
  getAllPost,
  updatePost,
  deletePost,
} = require("../controller/Post");
const { auth } = require("../middleware/Auth");

router.post("/create-post", auth, createPost);
router.get("/get-post", auth, getPost);
router.get("/get-posts", auth, getAllPost);
router.put("/update-post", auth, updatePost);
router.delete("/delete-post", auth, deletePost);

module.exports = router;
