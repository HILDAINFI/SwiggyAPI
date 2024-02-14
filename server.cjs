const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const mongoose = require('mongoose')
//const{ObjectId}=require('mongoose')
const{Restaurant,Users} = require('./schema.cjs')
const app=express()
app.use(bodyParser.json())
app.use(cors()) 
async function connectToDb() {
    try {
        await mongoose.connect('mongodb+srv://Hilda:hilda@cluster0.1uxpkss.mongodb.net/Swiggy?retryWrites=true&w=majority')
        console.log('DB connection established ;)')
        const port = process.env.port || 8000
        app.listen(port, function() {
            console.log(`Listening on port ${port}...`)
        })
    } catch(error) {
        console.log(error)
        console.log('Couldn\'t establish connection :(')
    }
}
connectToDb()
app.post('/add-restaurants',async function(request,response){
  
    try{
Restaurant.create({
    "areaName ":request.body.areaName,
    "CostForTwo":request.body.CostForTwo,
    "Cuisines":request.body.Cuisines,
    "Ratings":request.body.Ratings,
    "resName":request.body.resName
})
response.status(201).json({
    "status": "success",
    "message":"entry successful"
})

    }catch(error){
        response.status(500).json({
            "status":"failure",
            "mesage":"entry unsuccessful",
            "error":error
        })

    }
})
app.get('/get-restaurant-details',async function(request,response){
    try{
     const restaurantDetails=await Restaurant.find()
     response.status(200).json(restaurantDetails)
    }catch(error){
        response.status(500).json({
            "status":"failure",
            "mesage":"Could not fetch details",
            "error":error
        })

    }
})
app.delete('/delete-restaurant-detail/:id', async function(request, response) {
    try {
        const restaurant = await Restaurant.findById(request.params.id)
       if(restaurant){
        await Restaurant.findByIdAndDelete(request.params.id)
        response.status(200).json({
        "status":"success",
        "message":"deleted successfully"
        
        })
    } else{
        
        response.status(404).json({
            "status":"failure",
            "message":"entry not found"
        })
    }
}
catch (error) {
        response.status(500).json({
            "status":"failure",
            "message": "Entry not found",
            "error":error
        })
    }

})
app.post('/create-new-user', async function(request, response) {
    try {
        await Users.create({
            "userName": request.body.userName,
            "email": request.body.email,
            "password": request.body.password,
            "contact":request.body.contact
        })
        response.status(201).json({
            "status": "success",
            "message": "User created"
        })
    } catch (error) {
        response.status(500).json({
            "status": "failure",
            "message": "Internal server error"
        })
    }
})
app.post('/validate-user', async function(request, response) {
    try {
        const user = await Users.findOne({
            "email": request.body.email,
            "password": request.body.password
        })
        if (user) {
            response.status(200).json({
                "messsage": "valid user"
            })

        } else {
            response.status(401).json({
                "message": "invalid user"
            })
        }

    } catch (error) {
        response.status(500).json({
            "message": "Internal server error"
        })
    }

})
app.post('/update-restaurant-detail', async function(request, response) {
    try {
        const user = await Users.findOne({
            "email": request.body.email,
            "password": request.body.password
        })
        if (user) {
            response.status(200).json({
                "messsage": "valid user"
            })

        } else {
            response.status(401).json({
                "message": "invalid user"
            })
        }

    } catch (error) {
        response.status(500).json({
            "message": "Internal server error"
        })
    }

})
