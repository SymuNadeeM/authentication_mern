const bcrypt = require("bcrypt");
const User = require("../models/User");

const registerController = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    let user = new User({
      email:req.body.email,
      password:hash
    })
    user.save()
      .then(result => {
        res.status(201).json({
          message:"User create successfully",
          user:result

        })
      })
      .catch(error =>{
        res.json({
          error
        })
      })
  });
};

const loginController = (req, res, next) =>{
  let email = req.body.email
  let password = req.body.password

  User.findOne({email})
     .then(user =>{
       if(user){
        bcrypt.compare(password, user.password, (err,result) =>{
          if(err){
            res.json({
              message:"Error Occur"
            })
          }
          if(result){
            res.json({
              message:"Login successful"
            })
          }else{
            res.json({
              message:"Login Failed, Password Doesn't match"
            })
          }
        })
       }else{
        res.json({
          message: "User Not Found"
        })
       }
     })
}

const getAllUsers =(req, res, next)=>{
  User.find()
  .then(users => {
    res.json({
      users
    })
  })
  .catch((error) =>{
    res.json({
      error
    })
  })
}

module.exports = {
  registerController,
  getAllUsers,
  loginController
};
