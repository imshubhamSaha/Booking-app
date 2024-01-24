const User = require('../models/users');

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(201).json({allUsers:users});
    } catch (error) {
        console.log(error)
        res.status(500).json({error:error});
    }
}
exports.postAddUser = async (req,res,next) => {
    try {
        const username = req.body.username;
        const usercontact = req.body.usercontact;
        const useremail = req.body.useremail;
        const data = await User.create({
            username:username,
            usercontact:usercontact,
            useremail:useremail
        })
        res.status(201).json({newUserDetails:data});
    } catch (error) {
        console.log(error)
        res.status(500).json({error:error})
    }
}
exports.postDeleteUser = async (req,res,next) => {
    try {
        const uId = req.params.id
        await User.destroy({where: {id: uId}})
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error})
    }
}