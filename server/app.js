/* eslint-disable no-console */
const express=require("express");
const app=express();
const mongoose =require("mongoose");
const port=process.env.PORT||3000;
const users=require('./router/api/user');
const Profiles=require('./router/api/profiles');


const passport=require('passport');

const body=require("body-parser");
app.use(body.urlencoded({extended:false}))
app.use(body.json());
app.use('/api/users',users);
app.use('/api/profiles',Profiles);


const db =require('./config/key').mongourl;
//链接mongdb数据库
mongoose.connect(db)
        .then(x => console.log("链接成功"))
        .catch(err=>console.log(err))

//passport初始化
app.use(passport.initialize());

require('./config/passport')(passport)

app.get('/',(req,res)=>{
    res.send('45')
})
app.listen(port,() => {
    // eslint-disable-next-line no-console
    console.log(`server running on port ${port}`);
})
