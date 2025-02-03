const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./controllers/authCtrl");
const userRouter = require("./controllers/userCtrl");
const chatRouter = require("./controllers/chatCtrl");
const msgRouter = require("./controllers/messageCtrl");
const authMiddleWare = require("./middleware/authmiddleware");
const searchRouter = require("./controllers/searchRouterCtrl");


app.use(express.json())

app.use(cors())

app.use("/v1/api/auth", authRouter);

app.use("/v1/api/users",authMiddleWare, userRouter);

app.use("/v1/api/chat",authMiddleWare, chatRouter);
app.use("/v1/api/messages",authMiddleWare, msgRouter);


app.get("/search", searchRouter );


app.get("/test", (req, res) => {
    res.send('TESTING PURPOSE ')
} )

app.use((err, req, res, next) => {
    console.error('Error IN Middleware:', err.message);
    res.status(500).json({ error: err.message });
})
module.exports = app;