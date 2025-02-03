const router = require("express").Router();
const userModel = require("../models/usersmodel");


router.get("/get-logged-userdata", async(req, res)=>{
  try {
    const user = await userModel.findOne({_id: req.body.userId});
    if(!user) {
        res.json({
            success: false,
            message: "User not found"
        })
    }
    res.json({
        success: true,
        message: 'User fetched successfully',
        user
    })

  } catch (error) {
    res.json({
        success: false,
        message: error?.message
    })
  }
})


// Get all users expcet loggin user
router.get("/get-all-usersdata", async(req, res)=>{
    try {
      const users = await userModel.find({_id: {$ne: req.body.userId}});
      if(!users) {
          res.json({
              success: false,
              message: "Users not found"
          })
      }
      res.json({
          success: true,
          message: 'Users fetched successfully',
          users
      })
  
    } catch (error) {
      res.json({
          success: false,
          message: error?.message
      })
    }
  })

module.exports = router;