const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/usersmodel");

router.post("/signup", async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (user) {
            //400 bad request
            return res.status(400).json({
                message: "User already exist.Please sign in",
                success: false
            })
        }
        // if no user found then encryt password
        req.body.password = await bcryptjs.hash(req.body.password, 10);

        const newUser = new userModel(req.body);
        await newUser.save();
        // 201 created
        res.status(201).json({
            message: "User created",
            success: true
        })
    } catch (error) {
        res.json({
            success: false,
            message: error?.message
        })
    }
})

router.post("/signin", async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                message: "User not registered",
                success: false
            })
        }
        // if user then compare password
        const isValid = await bcryptjs.compare(req.body.password, user.password);
        if (!isValid) {
            return res.status(400).json({
                message: "password not matched",
                success: false
            })
        }
        //    if valid username and password
        const token = jwt.sign({ userId: user._id }, process.env.SECRETE_KEY, {
            expiresIn: '1d'
        })

        res.json({
            message: "login success",
            success: true,
            token
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error?.message
        })
    }
})


module.exports = router;