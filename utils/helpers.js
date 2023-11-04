import AppError from "./appError";
import jwt from "jsonwebtoken";

const createSendToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

export const sendTokenAsResponse = (res, user, statusCode) => {
  const token = createSendToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("token", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    token,
    user,
  });
};

// handle req body
export const handleReqBody = (req, schema, next) => {
  const { error, value } = schema.validate(req.body);
  if (error) return next(new AppError(error.details[0].message, 403));

  req.body = value;
  next();
};

// handle req params
export const handleReqParams = (req, schema, next) => {
  const { error, value } = schema.validate(req.params);
  if (error) return next(new AppError(error.details[0].message, 403));

  req.params = value;
  next();
};

// handle req query
export const handleReqQuery = (req, schema, next) => {
  const { error, value } = schema.validate(req.query);
  if (error) return next(new AppError(error.details[0].message, 403));

  req.query = value;
  next();
};

// handle req params and body
exports.handleReqParamsAndBody = (req, schema, next) => {
  const { error, value } = schema.validate({ ...req.params, ...req.body });
  if (error) return next(new AppError(error.details[0].message, 403));

  req.body = value;
  next();
};
