const express =require("express");
const router = express.Router();
const Cars = require("../model/cars.models")

const app = express();
app.use(express.json())

router.get("/",async (req,resp)=>{
    try{
        const cars = await Cars.find();
        resp.json(cars);
    }catch(err){
        resp.json({"message : ":err})
    }
})

router.get("/:regNumber",async (req,resp)=>{
    try{
        const cars = await Cars.findById(req.params.regNumber);
        resp.json(cars);
    }catch(err){
        resp.json({"message : ":err})
    }
})

router.post("/",async(req,resp)=>{
    console.log("holaaaa")
    const cars = new Cars({
        regNumber : req.body.regNumber,
        brand : req.body.brand,
        date : req.body.date,
        location : req.body.location,
        image : req.body.image,
        price : req.body.price
    });
    try{
        
        const response = await cars.save();
        resp.json(response);
        console.log(response)
    }catch(err){
        resp.json({"message : ":err})
        
    }
})

router.put("/:regNumber",async(req,resp)=>{
    try{
        const cars = await Cars.findById(req.params.regNumber);
        cars.brand = req.body.brand;
        cars.date = req.body.date;
        cars.location = req.body.location;
        cars.image = req.body.image;
        cars.price = req.body.price;
        const response = await cars.save();
        resp.json(response);
    }catch(err){
        resp.json({"message : ":err})
    }
})

router.delete("/:regNumber",async(req,resp)=>{
    console.log(req.params._id)
    try{
        const cars = await Cars.findById(req.params.regNumber);
        const response = await cars.remove()
        resp.json(response);
    }catch(err){
        resp.json(err);
    }
})

module.exports = router;