const express=require('express');
const Router=express.Router();
const Menu=require('./../models/menu');

Router.post('/', async (req,res)=>{
    try{
        //take data from body parser and store it in a variable
        const data2=req.body;
        // now make an instance of Menu model and put data2 which was retrieved into it
        const newMenu= new Menu(data2);
        // now if the data is in correct format according ot it s defined then it will be saved and we put this save in awit 
        //because this operation is going to take time, and we knew there it going to be an opration that sgonanna take time so we used async in the callback fucntion
        const response2=await newMenu.save();

        console.log("data saved");
        // return the response in json format with status code 200 if the datta is saved succesffully, otherwise it will move in catch
        res.status(200).json(response2);
    }catch(err){
      console.log(err);
      // if sav was not succesful due to any reason it will move into catch annd print the error in console and
      // send a response with status code 500 and json stating about the error
      res.status(500).json({error:"insrnal server error"});
    }
});
Router.get('/', async (req,res)=>{
    try{
        // here we simply want to get the data from db, so we do find the data and simply store it in variable const
        const data2= await Menu.find();
        console.log("data successfully fetched");
        res.status(200).json(data2);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});

    }
    
});

Router.get('/:taste',async(req,res)=>{
    try{
        //fetch taste from url in which client enetered the taste 
      const tastefetched=req.params.taste;  //taste fetchd in taste
      //now we will check if taste is among these then  
      if(tastefetched=='sweet'|| tastefetched == "spicy" || tastefetched =="sour" || tastefetched=='Sweet'|| tastefetched == "Spicy" || tastefetched =="Sour"){
        // if taste found to be among these then fetch that data where taste is among tastefetched that data will take time to be fetched so we write await here,
        // and because there was an opeartion that could take some time so used async in the callback function
        const response=await Menu.find({taste:tastefetched});  
        console.log("data fetched")
        res.status(200).json(response);
      }else{
        res.status(404).json({error:"taste not found"})
      }
    }catch(err){
      console.log(err);
      res.status(500).json({error:"internal server error"});
    }
})
Router.put('/:id',async(req,res)=>{
    try{
       //fetching id from url into menu id
     const menu_id=req.params.id;
     // now fethcing the updation to be done fromthe http request through req.body 
     const updated_menu=req.body;
     // now we will find the menu item and make change by using mongo db fucntion which finds the data with menu _id and makes update according to the parametre we passsed
     const response=await Menu.findByIdAndUpdate(menu_id,updated_menu,{
        new:true,
        runValidators:true
     });
     //
     if(!response){
       res.status(404).json({error:"Menu id not found"});
     }
     console.log("data updated");
     res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
})
Router.delete('/:id', async(req,res)=>{
    try{
        //fetch the id from the url
    const menu_id=req.params.id;
    // now delete simply
    const response=await Menu.findByIdAndDelete(menu_id);
    if(!response){
        res.status(404).json({error:"menu id not found"});
    }
    console.log("data deleted");
    res.status(200).json({message:"data deleted succesfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
    
})

module.exports= Router;