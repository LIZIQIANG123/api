const monges=require('mongoose');
const Schema=monges.Schema;


const userSchema=new Schema({
    name :{
        type:String,
        required:true
    },
    pwd:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    Identity:{
        type:String,
        required:true
    }
})
// eslint-disable-next-line no-undef
module.exports= User =monges.model("users",userSchema);