const express = require("express");
const {Worker} = require("worker_threads");
const app = express();
const port= process.env.PORT || 3000;

app.get('/non-blocking', (req, res)=> {
    res.status(200).send("This is non blocking")
})

app.get('/blocking', async(req, res)=> {
   const worker = new Worker("./worker.js");
 worker.on("message", (counter)=> {
   res.status(200).send(`This is blocking ${counter}`)
 })

 worker.on("error", (counter)=> {
    res.status(400).send(`Error`)
  })

  
})

app.listen(port, () => {
    console.log('started...');
    
})