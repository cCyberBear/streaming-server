const jsonwebtoken = require("jsonwebtoken");
const catchAsync = require("../middlewares/async");
const apiError = require("../utility/apiError");
const User = require("../Model/User");
const bcryptjs = require("bcryptjs");

exports.register = catchAsync(async (req, res) => {
  const { username, email, password, role } = req.body;
  const user = await User.create({ username, email, password, role });
  const token = jsonwebtoken.sign(
    {
      id: user._id,
      email,
      username,
      role: user.role,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "2h",
    }
  );
  res.status(201).json({
    success: true,
    user,
    token,
  });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const isExisted = await User.findOne({ email });
  if (!isExisted) {
    throw new apiError(404, "email or password is incorrect");
  }
  const isMatch = bcryptjs.compareSync(password, isExisted.password);
  if (!isMatch) {
    throw new apiError(404, "email or password is incorrect");
  }
  const token = jsonwebtoken.sign(
    {
      id: isExisted._id,
      email: isExisted.email,
      username: isExisted.username,
      role: isExisted.role,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "2h",
    }
  );
  res.json({
    success: true,
    token,
    user: isExisted,
  });
});
exports.me = catchAsync(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const data = jsonwebtoken.verify(token, process.env.JWT_KEY);
  const user = await User.findOne({ _id: data.id });
  res.json({
    success: true,
    user: user,
  });
});
exports.getAllUser = catchAsync(async (req, res) => {
  const users = await User.find({ role: "customer" }).select("-password");
  res.json({
    success: true,
    users,
  });
});

exports.changePassword = catchAsync(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const email = req.user.email;
  const user = await User.findOne({ email });
  const isMatch = bcryptjs.compareSync(oldPassword, user.password);
  if (!isMatch) {
    throw new apiError(400, "Incorrect password");
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json({
    success: true,
  });
});

exports.userShipment = catchAsync(async (req, res) => {
  const { fullName, address, phoneNumber } = req.body;
  const _id = req.user.id;
  const updated = await User.findByIdAndUpdate(
    _id,
    {
      fullName,
      address,
      phoneNumber,
    },
    { new: true }
  );
  res.status(200).json({
    success: true,
    user: updated,
  });
});
