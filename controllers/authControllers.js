import { sendTokenAsResponse } from "../utils/helper";
import User from "../models/userModel";
import bcrypt from "bcrypt";

export const signup = catchAsync(async (req, res, next) => {
  const { name, phone, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, phone, password: hashedPassword });

  sendTokenAsResponse(res, user, 200);
});
