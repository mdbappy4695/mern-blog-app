const express = require("express");
const {
  getAllBlogController,
  createBlogController,
  updateBlogController,
  singleBlogController,
  deleteBlogController,
  userblogController,
} = require("../controller/blogController");

const router = express.Router();

//routes
router.get("/all-blog", getAllBlogController);

//create blog || post
router.post("/create-blog", createBlogController);

//update blog || put
router.put("/updated-blog/:id", updateBlogController);

//single-blog || get
router.get("/get-blog/:id", singleBlogController);

//delete blog || delete
router.delete("/delete-blog/:id", deleteBlogController);

//user blog || get
router.get("/user-blog/:id", userblogController);

module.exports = router;
