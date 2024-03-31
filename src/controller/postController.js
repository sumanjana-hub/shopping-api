const { createSchema, updateSchema } = require("../middleware/validation");
const postModel = require("../model/postModel")

const create = async (req, res) => {
  try {
    const { error } = createSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const {
      title,
      description,
      status,
    } = req.body;

    if (!title || !description || !status) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all fields",
      });
    }
    const newPost = new postModel({
      title,
      description,
      status,
    });

    await newPost.save();
    res.status(201).send({
      success: true,
      message: "New Food Item Created",
      newPost
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create post api",
      error,
    });
  }
};




const get = async (req, res) => {
  try {
    const postID = req.params.id;
    if (!postID) {
      return res.status(404).send({
        success: false,
        message: "please provide id",
      });
    }
    const food = await postModel.find({ post: postID });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No post Found with htis id",
      });
    }
    res.status(200).send({
      success: true,
      message: "get all post",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In get SIngle post API",
      error,
    });
  }
};


const update = async (req, res) => {
  try {
    const { error } = updateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const foodID = req.params.id;
    if (!foodID) {
      return res.status(404).send({
        success: false,
        message: "no post id was found",
      });
    }
    const food = await postModel.findById(foodID);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No post Found",
      });
    }
    const {
      title,
      description,
      status,
      
    } = req.body;
    const updatedPost = await foodModal.findByIdAndUpdate(
      foodID,
      {
        title,
        description,
        status,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "post Item Was Updated",
      updatedPost
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr In Update Post API",
      error,
    });
  }
};


const deletepost = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "provide Post id",
      });
    }
    const food = await postModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No post Found with id",
      });
    }
    await foodModal.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "post Item Dleeted ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror In Delete post APi",
      error,
    });
  }
};



 

module.exports = {
  create,
  get,
  update,
  deletepost
};