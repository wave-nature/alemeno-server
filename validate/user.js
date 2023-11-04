import joi from "joi";
const { handleReqBody } = require("../utils/helper");

export const validateUser = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().required(),
    phone: joi.string().min(10).required(),
    password: joi.string().min(6).required(),
  });

  handleReqBody(req, schema, next);
};

export const validateLoginUser = (req, res, next) => {
  const schema = joi.object({
    phone: joi.string().min(10).required(),
    password: joi.string().min(6).required(),
  });

  handleReqBody(req, schema, next);
};
