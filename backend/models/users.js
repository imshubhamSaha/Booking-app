const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define("userdetails", {
    id: {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true

    },
    username: {
        type:Sequelize.STRING,
        allowNull:false
    },
    usercontact: {
        type:Sequelize.STRING,
        allowNull:false
    },
    useremail:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

module.exports = User;