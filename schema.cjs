const mongoose = require('mongoose')
// defining the schema
const restaurantSchema = new mongoose.Schema({
    areaName : {
        type : String
    },
    costForTwo : {
        type : String
    },
    cuisines: {
        type : Array
    },
    avgRating: {
        type : Number
    },
    imageLink:{
       type:String
        },
    name: {
        type : String
    }

})
const Restaurant = mongoose.model('resList',restaurantSchema)


const userSchema=new mongoose.Schema({
    contact:{
        type:String
    },
    userName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }

})
const Users=mongoose.model('userDetails',userSchema)



module.exports={Restaurant,Users}