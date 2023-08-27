const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const data = require("./todo.json");
const signup = require("./users/signup");

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

app.post("/api/user/signup", signup);

app.listen(port, () => {
  console.log(`Server working on port ${port}`);
});
