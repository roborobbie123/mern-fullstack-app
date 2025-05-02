const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const HttpError = require("../models/http-error");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    return next(new HttpError("Unable to retrieve users", 500));
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passes, please check your data.")
    );
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(
      new HttpError("Signing up failed, please try again later", 500)
    );
  }

  if (existingUser) {
    return next(new HttpError("Account with this email already exists", 422));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return next(new HttpError("Could not create user, please try again", 500));
  }

  const newUser = new User({
    name,
    email,
    hashedPassword,
    image: req.file.path,
    places: [],
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(
      new HttpError("Could not sign up, please try again later", 500)
    );
  }

  let token;

  try {
    token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(
      new HttpError("Could not sign up, please try again later", 500)
    );
  }

  res
    .status(201)
    .json({ userId: newUser.id, email: newUser.email, token: token });
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return next(
      new HttpError("Invalid inputs passes, please check your data.", 422)
    );
  }

  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Log in failed, please try again later", 500));
  }

  if (!existingUser) {
    return next(new HttpError("Invalid credentials, cannot log in", 401));
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    return next(new HttpError("Invalid credentials, please try again", 500));
  }

  if (!isValidPassword) {
    return next(new HttpError("Invalid credentials, please try again", 500));
  }

  let token;
  try {
    token = jwt.sign(
      {
        user: existingUser.id,
        email: existingUser.email,
      },
      "supersecret_dont_share",
      { expiresIn: "1hr" }
    );
  } catch (err) {
    return next(new HttpError("Log in failed, please try again later", 500));
  }

  res.status(200).json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
