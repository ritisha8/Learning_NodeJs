const express=require('express');
const app=express();
const db= require('./db');
const bodyParser=require('body-parser');
const passport=require('./auth');


app.use(bodyParser.json()); // whtever data was comignwe stored it in the form of json and it is stored in req.body

//middleWare function of logging request
const logRequest=(req,res,next)=>{
console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`);   //req.originalUrl
next();
}


// to use passportmiddleware
app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local',{session:false});

// middleware function using
app.use(logRequest);

app.get('/',(req,res)=>{
    res.send("welcome to our hotel");
})
     

//personRoutes importing
const personRoutes=require('./routes/personRoutes');
//use this personroutes
app.use('/person',localAuthMiddleware,personRoutes);

//const Menuroutes importing
const menuRoutes=require('./routes/MenuRoutes');
//using menuroutes
app.use('/Menu',menuRoutes);

app.listen(3000, ()=>{
    console.log("server is running");
});
