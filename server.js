const express=require('express');
const app=express();
const db= require('./db');
const bodyParser=require('body-parser');
app.use(bodyParser.json()); // req.body

app.get('/',(req,res)=>{
    res.send("welcome to our hotel");
})

//personRoutes importing
const personRoutes=require('./routes/personRoutes');
//use this personroutes
app.use('/person',personRoutes);

//const Menuroutes importing
const menuRoutes=require('./routes/MenuRoutes');
//using menuroutes
app.use('/Menu',menuRoutes);

app.listen(3000, ()=>{
    console.log("server is running");
});
