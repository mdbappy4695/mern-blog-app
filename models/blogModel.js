const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    image: {
      type: String,
      required: [true, "image is required"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      require: [true, "user id is required"],
    },
  },
  { timestamps: true }
);

const blogModel = mongoose.model("blog", blogSchema);
module.exports = blogModel;
