const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const createSchema = Joi.object({
     title: Joi.string().required(),
     description: Joi.string().required(),
     status: Joi.string().required(),
  })

  const updateSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().required(),
  })

  module.exports = {
    registerSchema, loginSchema, createSchema, updateSchema
  }