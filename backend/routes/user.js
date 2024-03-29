const express = require("express");

const router = express.Router();
const userController = require("../controllers/user");

router.post("/user/add-user", userController.postAddUser);

router.get("/user/get-users", userController.getUsers);

router.delete("/user/delete-user/:id", userController.postDeleteUser);

module.exports = router;
