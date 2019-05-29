const monges=require('mongoose');
const Schema=monges.Schema;


const ProfilesSchema=new Schema({
    type :{
        type:String
    },
    des:{
        type:String,
        required:true
    },
    incode:{
        type:String,
       required:true
    },
    expends:{
        type:String,
        required:true
    },
    cash:{
        type:String,
        required:true
    },
    remake:{
        type:String,
       
    },
    date:{
        type:Date,
        default:Date.now
    }
})
// eslint-disable-next-line no-undef
module.exports= Profiles =monges.model("Profiles",ProfilesSchema);