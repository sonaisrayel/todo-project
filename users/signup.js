const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const users = require("../users.json");

const regDate = require("../helpers/getRegDate")();

const signup = (req, res) => {
  const { username, email, password, repeatPassword, gender, birthday } =
    req.body;

  const userNames = users.map((user) => user.username);
  const emails = users.map((user) => user.email);

  if (username.includes(" ")) {
    return res.status(403).send({
      message: "Username cannot contain spaces.",
    });
  }

  if (userNames.includes(username)) {
    return res.status(409).send({ message: "Username exists" });
  }

  if (username.length < 8 || password.length < 8) {
    return res.status(403).send({
      message: "Username and password must contain at least 8 symbols.",
    });
  }

  if (username.length > 30 || password.length > 30) {
    return res.status(403).send({
      message: "Too long username or password. Max length is 30 symbols.",
    });
  }

  if (emails.includes(email)) {
    return res.status(409).send({ message: "Email exists" });
  }

  if (
    !email.includes("@") ||
    !email.includes(".") ||
    email.endsWith("@") ||
    email.endsWith(".") ||
    email.startsWith("@") ||
    email.startsWith(".") ||
    email.includes(" ")
  ) {
    return res.status(403).send({
      message: "Invalid email.",
    });
  }

  if (password !== repeatPassword) {
    return res.status(403).send({ message: "Password does not match" });
  }

  if (new Date(regDate).getFullYear() - new Date(birthday).getFullYear() < 19) {
    return res
      .status(403)
      .send({ message: "You are too young to use this page." });
  }

  const user = {
    username,
    email,
    password,
    dateOfRegistration: regDate,
    gender,
    birthday,
    id: uuidv4(),
  };

  users.push(user);

  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

  res.status(201).send({ message: "User is created", user: user });
};

module.exports = signup;
