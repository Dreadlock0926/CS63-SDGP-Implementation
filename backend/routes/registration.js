const express = require('express');
const router = express.Router();
const userModel  = require("../models/user");

router.route("/registration").post(async(req,res)=>{
  const {username , password } = req?.body;

  console.log(username);
  console.log(password);

  console.log(req.session.id);
  req.sessionStore.get(req.session.id,(err,sessionData)=>{
    if(err){
      console.log(err);
      throw err;
    }
    console.log(sessionData);

  });
  req.session.visited = true;

  if(!username|| !password){
    res.status(400).json({Alert:"Please provide correct details ! "});

  }
  try{

    const userBody = await userModel.create({
      username,
      password
    })
    console.log(userBody);
    if(!userBody){
      return res.status(400).json({Alert:"It has not been stored in the database ! "});

    
    }
    return res.status(200).json({Alert:"it is successfully stored in the data base ! "});
    

  }catch(err){
    console.log("The error is "+err);

  }

})

router.route("/login").get(async(req,res)=>{
  const {username,password} = req?.body;
  try{
    const getuserDetails = await userModel.findOne({username,password});


    if(!getuserDetails){
      return res.status(401).json({Alert:"Invalid input ! "});
    }
    req.session.user = getuserDetails;
    return res.status(200).json({Successfull:getuserDetails});

    
  }catch(err){

  }
})

router.route("/api/auth/status").get((req,res)=>{
  req.sessionStore.get(req.sessionID,(err,session)=>{
    console.log(session);
  })
  return req.session.user ? res.status(200).send(req.session.user):res.status(401).send({msg:"Not athuanticated"});

});




module.exports = router;
