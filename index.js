const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const fs = require("fs");
const data = require("./todo.json");
const { v4: uuidv4 } = require("uuid");

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  const { title, description, completed } = req.body;

  const titles = data.map((d) => d.title);

  if (!titles.includes(title)) {
    data.push({ title, description, completed, id: uuidv4() });
    fs.writeFileSync("todo.json", JSON.stringify(data, null, 2));

    return res.send(data);
  }

  return res.status(404).send({ message: "Todo is exists" });
});

app.post("/api/user", (req, res) => {
  const { userName, email, password } = req.body;

  const userNames = users.map((user) => user.userName);
  const passwords = users.map((user) => user.password);
  const emails = users.map((user) => user.email);

  if (userNames.includes(userName)) {
    return res.status(404).send({ message: "Username exists" });
  }

  if (userName.length < 8 || password.length < 8) {
    return req.status(404).send({
      message: "Username and password must contain at least 8 symbols.",
    });
  }

  if (emails.includes) {
    return res.status(404).send({ message: "Email exists" });
  }

  const user = {
    userName,
    email,
    password,
  };

  res.status(201).send({ message: "User is created", user: user });
});

app.listen(port, () => {
  console.log(`Server working on port ${port}`);
});
