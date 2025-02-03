const mongooose =  require("mongoose");

mongooose.connect(process.env.DB_CONN_STRING);

const db = mongooose.connection; //returns state

db.on("connected", ()=> {
    console.log('DB connected successfully 👍..');
})

db.on("err", ()=> {
    console.log('DB connected Failed 😢..');
})

module.exports = db;
