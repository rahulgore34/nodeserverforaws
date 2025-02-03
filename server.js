const dotenv = require("dotenv");
dotenv.config({
    path: "./config.env"
});

const mydb = require("./config/dbConfig"); //in this file there is events for connection
const app = require("./app"); //always put this line below config
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, ()=> {
    console.log('Listeing on '+PORT+ ' serverr '+process.env.TEST);
})

process.on("uncaughtException",(err)=>{
    console.log(err.name+" "+err.message);
    server.close(()=>{
        process.exit(1)
    })
    
})

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason.message);
    server.close(()=>{
        process.exit(1)
    })
});