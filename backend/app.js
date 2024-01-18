const express = require('express');
const bodyParser = require('body-parser')

const sequelize = require('./util/database');
const cors = require('cors');
const userController = require('./controllers/user')

const userRoutes = require("./routes/user");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(cors());;

app.use(bodyParser.json({extended:false}));

app.use(userRoutes);
app.post('/user/delete-user', userController.postDeleteUser)
sequelize
.sync()
.then(res => app.listen(3000))
.catch(err => console.log(err));