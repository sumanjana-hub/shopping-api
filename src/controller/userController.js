const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerSchema, loginSchema } = require("../middleware/validation");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { username, password, email } = req.body;

    if (!username || !email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide all required information",
      });
    }
    const existinguser = await userModel.findOne({ email });
    if (existinguser) {
      return res.status(500).send({
        success: false,
        message: "email already registered please login",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      username,
      email,
      password: hashedpassword,
    });
    res.status(200).send({
      success: true,
      message: "sucessfully registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error",
    });
  }
};

const login = async(req,res)=>{
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
     const {email,password} = req.body;
     if(!email||!password){
        return res.status(404).send({
            success: false,
            message: "Inavalid email or password",
        })
     }
    const user = await userModel.findOne({ email})
    if(!user){
        return res.status(404).send({
            success: false,
            message: "Email not found",
        })
    }
     const match = await comparepassword(password,user.password)
     if(!match){
        return res.status(200).send({
            success: false,
            message: "Inavalid  password",
        })
     }
     const token = await jwt.sign({_id:user._id},JWT_SECRET,{expiresIn:"7d"});
     res.status(200).send({
        success: true,
        message: "Login successfully",
        token
     })
  } catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message: "Error in login",
        error
    })
  }
}



module.exports = { register, login };
