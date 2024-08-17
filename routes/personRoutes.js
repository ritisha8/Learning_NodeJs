const express=require('express');
const router=express.Router();
const person=require('./../models/person');

// we use async when we know there is an peration i side thats goind to take time , so we have to wait  for it so we use async

router.post('/',async (req,res)=>{ // in order to recieve sav data we need t define an endpoint where the data will be savd we defined here whenever someone comes /person endpoint his datawill  saved
    try{
     const data= req.body;  // now we take the data converted by bodyparser into a variable data , and we know bodyparser stores the data hat it brings in req.body
     // create new person document using mongoose model
     const newperson= new person(data);  // created a newperson row with person model created using mongoose and passed data in it that we got through req.body
 
     const response=await newperson.save();  // here we save the new person document we got from the client , we wait or the saev operation as it sgoijng to take time, and so it is written awit before it.  then when the datta is saved whtever repsonse we save in a variable response
     console.log("data saved");  // then if it saves data succefullythen his tstaemnt will execute
     res.status(200).json(response);// and then returns the dta succesfully savd in json foramt with status code
     //status code 200 means okey, whereas status code 500 mean sinternal server error
 
     }catch(err){// if due yo any reason the datta is not saved ,maybe due to any constraints we defined in the model
         console.log(err);  // then this executes, and error msg is printed
         res.status(500).json({error:"internal server error"});  // then this ststus 500 is returned with json response of internal server error
     }
 });
router.get('/', async (req,res)=>{
     try{
          const data=await person.find();  // in order to fetch data from dattabase we use new person is our collection, so new person.find(), and store the response in data
          console.log("data fetched");// now if data succesfullly fetched , this tatement executes and prints on sonsole datta fetched
          res.status(200).json(data);// and now this will send a json reponse in postman of the data we fetched with status code 200 that is OK
     }catch(err){   // now if the data is not fethced 
        console.log(err);  // this taement is executed  and prints the rror in console , the reason why data could no be fetched
        res.status(500).json({error:"internal server error"})  // and gives a json response in postman
 
     }
    })
    
   router.get('/:worktype', async (req,res)=>
        {
            try{
             const worktype=req.params.worktype;  // extracting the worktype from url and putting it into variable worktype
             if(worktype =='chef' || worktype =='manager'|| worktype =='waiter'){
                const data=await person.find({work:worktype});  //now we will take that data from person in reponse whose worktype would be chef, manager or waiter
                console.log("data fetched");
                res.status(201).json(data);
             }
             else{
                res.status(404).json({error:"invalid work type"});
             }
            }catch(err){
                 console.log(err);
                 res.status(500).json({error:"internal server error"});
            }
        });

    router.put('/:id',async(req,res)=>{
        try{
            //fetch id from url that client entered into url
           const person_id=req.params.id;
        // now fetch the updated record client entered from the http request
        const updated_data=req.body;
        // now find the datta and update there is a funtion in mongodb regarding same
        const response=await person.findByIdAndUpdate(person_id,updated_data, {
            new: true,
            runValidators:true
        });
        // it could be that thei provided is not found so then the response will be null in that case if will execute
        if(!response){
            res.status(404).json({error:"person not found"});
        }
        console.log("data updated");
        res.status(200).json(response);
        }
        catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
        }
    });
    router.delete('/:id',async(req,res)=>{
        try{
         //fetching id from url that client entered into it
        const person_id=req.params.id;
        //now find the data and delete
        const response=await person.findByIdAndDelete(person_id);
        if(!response){
            res.status(404).json({error:"person not found"});
        }
        console.log("data deleted");
        res.status(200).json({message:"data deleted succesfully"});

        }catch(err){
            console.log(err);
            res.status(500).json({error:"internal server error"});
        }
    });
    module.exports = router;
 
