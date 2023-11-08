import Joi from "joi";

const handleReqBody = (req, schema, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    // Validation failed
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(400).json({ error: errorMessage });
  }

  // Validation passed, proceed to the next middleware
  // next();
};

export const validateUser = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi().string().email().required(),
    password: Joi.string().min(6).required(),
  });

  handleReqBody(req, schema, next);
};

export const validateLoginUser = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  handleReqBody(req, schema, next);
};
