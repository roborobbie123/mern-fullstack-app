const { v4: uuidv4 } = require("uuid");

const HttpError = require("../models/http-error");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Robb Barrett",
    email: "test@test.com",
    password: "testers",
  },
  {
    id: "u2",
    name: "Jayden Daniels",
    email: "test5@test.com",
    password: "testers5",
  },
];

const getUsers = (req, res, next) => {
  res.status(200).json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const { userName, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((user) => user.email === email);
  if (hasUser) {
    return next(
      new HttpError("There is already an account with this email", 422)
    );
  }

  const createdUser = {
    id: uuidv4(),
    name: userName,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const user = DUMMY_USERS.find((user) => user.email === email);

  if (!user || password !== user.password) {
    return next(new HttpError("Invalid login"));
  }

  res.status(200).json({ user: user });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
