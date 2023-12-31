const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
//create user regisger user
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //validation
    if (!username || !email || !password) {
      return res.status(500).send({
        success: false,
        message: "please fill all fields",
      });
    }
    //existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        success: false,
        messaga: "user already exisits",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    //save new user
    const user = await new userModel({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "new User Created",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      messaga: "error in register callback",
      success: false,
      error,
    });
  }
};

//get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      userCont: users.length,
      success: true,
      message: "all users data",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      messaga: "error in get all users",
      error,
    });
  }
};

//login
exports.LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        messaga: "please provide email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({
        success: false,
        messaga: "email is not registered",
      });
    }
    //password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        messaga: "Invaild username or password",
      });
    }
    return res.status(200).send({
      success: true,
      message: "login successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      messaga: "error in login",
      error,
    });
  }
};
