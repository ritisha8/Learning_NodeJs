const mongoose=require('mongoose');
//define schema
const MenuSchema = new mongoose.Schema({
 name:{
    type: String,
    required:true
 },
 price:{
    type:Number,
    required:true
 },
 taste:{
    type: String, 
    enum:['sweet','sour','spicy','Sweet','Sour','Spicy']
 },
is_drink:{
    type: Boolean,
    default: false
},
ingredients:{
    type: [String],
    default:[]
},
num_sales:{
    type:Number,
    default:0
}
});

// now make a mongoose model
const Menu=mongoose.model('Menu',MenuSchema);
module.exports=Menu;
