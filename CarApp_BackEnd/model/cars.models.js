const mongoose = require("mongoose");

const post = mongoose.Schema({
    
    regNumber:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
})

module.exports = mongoose.model("Post",post);