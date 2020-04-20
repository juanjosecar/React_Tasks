const userCtrl = {};
const User = require('../models/User');

userCtrl.getUsers = async (req,res)=>{
    const Users =  await User.find();
    res.json(Users);

};

userCtrl.createUser = async (req,res)=>{
    const {username} = req.body;
    const newUser = new User({username});
    await newUser.save();
    res.json({messag:'User created'})
};

userCtrl.deleteUser = async(req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    res.json({title:'User Deleted'})
};


module.exports = userCtrl;