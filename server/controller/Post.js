const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const { userId } = req.user;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(401).json({
        success: false,
        message: "All details are required",
      });
    }

    const post = await Post.create({
      title,
      content,
      author: userId,
    });

    res.status(200).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating post",
      error: error.message,
    });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { userId } = req.user;

    const post = await Post.findById(userId)
      .populate("author", "name email")
      .exec();

    res.status(200).json({
      success: true,
      message: "Post fetched successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching post",
      error: error.message,
    });
  }
};

exports.getAllPost = async (req, res) => {
  try {
    const post = await Post.find().populate("author", "name email").exec();

    res.status(200).json({
      success: true,
      message: "Post fetched successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Somethig went wrong while fetching post",
      error: error.message,
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { postId, title, content } = req.body;

    const post = await Post.findById(postId);

    post.title = title;
    post.content = content;
    await post.save();

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating post",
      error: error.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.body;

    const post = await Post.findOneAndDelete({ _id: postId });

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while deleting post",
    });
  }
};
