const mongoose= require('mongoose');
const bcrypt=require('bcrypt');

// define the person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    age:{
        type: Number
    },
    work:{
        type :String,
        enum: ["chef","manager","waiter"],
        required:true
    },
    mobile:{
        type :String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
     type:String,
    },
    salary:{
        type:Number,
        required:true
    },
    //defining username and  password in orginal schema for authentication
    //gnerally this usernamr and  passord is stored with a persons record and we idditnstore it so now we are adding it with schema
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }

})// here pre is a middleware that is telling that this operation willl execute bfore save event,
// here next function will indicat3 that we have succefully done opurn operation now u can save the datta in db
personSchema.pre('save',async function(next){
       const person=this;
       // first we will check if it is a new passord or it is bbeing modified
       if(!person.isModified('password')){
            return next();  // passowrd not modified siomply return next fucntion
       }
       // if itn is odiefied we come in this try catch block and 
    try{  
        //gen the salt
        const salt= await bcrypt.genSalt(10);
        //now hash thew passwortd with salt
        const HashedPassword=await bcrypt.hash(person.password,salt);
        //now just change the value of passowrd before storing
        person.password=HashedPassword;
      // call the next function so that save canm fuccesfullly be executeed
        next();
    }catch(err){
        return next(err);  // if there is any error this will bw passed in next
    }
       
});

// compare function in bcrypt works in a very intrsting way , first it will take the password given by user as param and then it will extract the salt from the password that is saved in our db
// then it will add that salt with the password we entered and then gen a hashed password and then it will compare this hashed pass with the hashed passworr in db
personSchema.methods.comparePassword= async function(PASS) {
    try{
       const isMatch=await bcrypt.compare(PASS,this.password);
       return isMatch;
    }
    catch(err){
         throw err;
    }
}
const person=mongoose.model('person',personSchema);
module.exports =person;
