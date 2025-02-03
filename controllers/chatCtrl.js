const router = require("express").Router();
const ChatModel = require("../models/chatmodel");

router.post("/create-new-chat", async(req, res)=>{
    try {
        const newchat =  new ChatModel(req.body);
        await newchat.save();
        res.status(201).json({
            success: true,
            message: 'new chat created',
            data: newchat
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error?.message
        })
    }
})

// Get all chat associated with logged in user
router.get("/get-all-chats", async(req, res)=>{
    try {
        const chat =  await ChatModel.find({members: {$in: req.body.userId}});
       if(!chat) {
        res.status(400).json({
            success: false,
            message: 'bno chat records'
        })
       }
        res.status(200).json({
            success: true,
            message: 'chat found',
            data: chat
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error?.message
        })
    }
})

module.exports = router;