const Sequelize = require('sequelize');

const sequelize = new Sequelize("booking-app", "root", "AEIEasn@1", {
    dialect: "mysql",
    host:"localhost"
});

module.exports = sequelize;