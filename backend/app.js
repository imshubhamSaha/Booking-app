const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");
const cors = require("cors");

const userRoutes = require("./routes/user");
const app = express();

app.use(cors());

app.use(bodyParser.json({ extended: false }));

app.use(userRoutes);

sequelize
  .sync()
  .then((res) => app.listen(3000))
  .catch((err) => console.log(err));
