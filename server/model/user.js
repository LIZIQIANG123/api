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
    }
})
// eslint-disable-next-line no-undef
module.exports= User =monges.model("user",userSchema);