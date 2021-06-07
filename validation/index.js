const Joi = require("joi");

// Registration validation
const registerValidation = (data) => {
  const registrationSchema = Joi.object({
    userName: Joi.string()
      .min(5)
      .message("username too short 😫")
      .max(15)
      .message("username too long 😫")
      .required(),
    password: Joi.string().min(6).message("password too short 😫").required(),
    email: Joi.string().min(6).message("username too short 😫").required(),
  });

  return registrationSchema.validate(data);
};

// Login validation
const loginValidation = (data) => {
  const loginSchema = Joi.object({
    userName: Joi.string().min(5).max(15).required(),
    password: Joi.string().min(6).required(),
  });

  return loginSchema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
