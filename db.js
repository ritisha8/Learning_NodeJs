// db.js file is for establishing connectionbetween dn server and node server
const mongoose=require('mongoose');  // we will ffirst import mongooe library

// install mongoose using command npm i mongoose, then chekc lock.json if its included in dependecies
const mongoURL='mongodb://localhost:27017/hotels';   // define the url to your mongodb server

mongoose.connect(mongoURL,{     // now we call mognoose.connect with parametres as MOngourl in order to establish connection beteween mogngo serve and node server
    useNewUrlParser:true,  //because mongodb contiuously updates itself so we we use this parametre that newurlparser that to show that we are working withthe latest version
    useUnifiedTopology:true //  these prametres are not  necessary but it is advised to use them as it is a good practise when u become adeveloper and also because of this it will not show any pop ups or warnigns while establishing connetion
})   //this step intilializes the connection by creating a default object but doesnot actually connect at this point

//now we define an variable that will store the the defeulat object and whih willl be used in server.js for any db related fucntions 
// mongodb maintains a default object representing the mongodb connection , we store it in variable db
const db=mongoose.connection;
// db object is what we will use to handle events amd interact with database

// definign evet listeners so tht whenever connetcuon is extablised they automatically recieve the message amd give response according to that
//these event listener allow u to react to dioff states of db coneectiion 
db.on('connected',()=>{
    console.log("mongodb connection established");
})
db.on('disconnected',()=>{
    console.log("mongodb disconnected");
})
db.on('error',(err)=>{
    console.log("mongodb connection error:",err);
})


// finally export the db object , so that we can impoort it and use it in other parts of node js application
module.exports=db;

