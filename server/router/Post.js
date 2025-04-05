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

router.post("/create_post", auth, createPost);
router.get("/get_post", auth, getPost);
router.get("/get_posts", auth, getAllPost);
router.put("/update_post", auth, updatePost);
router.delete("/delete_post", auth, deletePost);

module.exports = router;
