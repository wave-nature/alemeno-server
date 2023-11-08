import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import User from "../models/userModel.js";
import { sendTokenAsResponse } from "../utils/helpers.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const signup = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ username, email, password: hashedPassword });

  sendTokenAsResponse(res, user, 201);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");

  const passwordCorrect = await bcrypt.compare(password, user.password);

  if (!user || !passwordCorrect) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 2) If everything ok, send token to client
  sendTokenAsResponse(res, user, 200);
});

export const protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});
