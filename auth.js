const passport=require('passport'); 
const person=require('./models/person');
const LocalStrategy=require('passport-local').Strategy;

//we made changes in schema now we need a verification function to  check whether the usrnamend passowrd providedto us is correct or not
passport.use(new LocalStrategy(async (USER, PASS, done)=>{
    // authentiaction logic
    try{
     const user=await person.findOne({username:USER});
      if(!user){
        return done(null,false,{message:"incorrect username"});
      }
      const isPassMatch=user.comparePassword(PASS);
      if(isPassMatch){
        return done(null,user);
      }else{
        return done(null,false,{message:"incorrect password"});
      }

    }catch(err){
        return done(err);
    }
}))
module.exports=passport;