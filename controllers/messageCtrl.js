const router = require("express").Router();
const ChatModel = require("../models/chatmodel");
const messageModel = require("../models/messagesmodel");

router.post("/new-message", async(req, res)=>{
    try {
        const newMessage =  new messageModel(req.body);
        const savedMessage = await newMessage.save();

        // store this message in chat collection->lastmessage
        // const currentChat = await ChatModel.findById(req.body.chatId);
        // currentChat.lastMessage = savedMessage._id;
        // await currentChat.save();

        // Aboe can be written as below
        const currentChat = await ChatModel.findOneAndUpdate(
            {
                _id: req.body.chatId
            },
            {
                lastMessage: savedMessage._id,
                $inc: {unreadMessageCount: 1}
            }
        );

        res.status(201).json({
            success: true,
            message: 'mesage saved',
            data: savedMessage
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error?.message
        })
    }
})


router.get("/get-messages/:chatId", async(req, res)=>{
    try {
        const msgs =  await messageModel.find({chatId: req.params.chatId}).sort({createdAt: 1});
        res.status(200).json({
            success: true,
            message: 'mesage fetched successfully',
            data: msgs
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error?.message
        })
    }
})



module.exports = router;