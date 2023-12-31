const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

//get all blogs
exports.getAllBlogController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user");
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "no blog found",
      });
    }
    return res.status(200).send({
      Blogcount: blogs.length,
      success: true,
      message: "all blogs lists",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error while geting blog",
    });
  }
};

//create blogs
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;

    if (!title || !description || !image || !user) {
      return res.status(500).send({
        success: false,
        message: "fill up all feild",
      });
    }
    const exisitingUser = await userModel.findById(user);
    //validation
    if (!exisitingUser) {
      return res.status(404).send({
        success: false,
        message: "unable to find user",
      });
    }

    const newblog = await new blogModel({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newblog.save({ session });
    exisitingUser.blogs.push(newblog);
    await exisitingUser.save({ session });
    await session.commitTransaction();
    await newblog.save();
    return res.status(201).send({
      success: true,
      message: "blog create",
      newblog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error while createing blog",
    });
  }
};

//single blogs
exports.singleBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "blog not found with this is",
      });
    }
    return res.status(200).send({
      success: true,
      message: "fetch single blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error while getting single blog",
      error,
    });
  }
};

//update blogs
exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "blog updated",
      blog,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "error update blog",
    });
  }
};

//delete blogs
exports.deleteBlogController = async (req, res) => {
  try {
    const blog = await blogModel
      // .findOneAndDelete(req.params.id)
      .findByIdAndDelete(req.params.id)
      .populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).send({
      success: true,
      message: "Blog Deleted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Erorr WHile Deleteing BLog",
      error,
    });
  }
};

//get user blog
exports.userblogController = async (req, res) => {
  try {
    const uesrBlog = await userModel.findById(req.params.id).populate("blogs");
    if (!uesrBlog) {
      return res.status(404).send({
        success: false,
        message: "blogs not fond with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "user blogs",
      uesrBlog,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Erorr get user blog",
      error,
    });
  }
};
