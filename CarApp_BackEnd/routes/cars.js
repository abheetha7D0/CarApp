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


router.put("/regNo='", async (req, resp) => {
    console.log("updatee")
    try {
      let res = await Cars.find();
      let obj = undefined;
      let response = undefined;
      res.forEach(async (e) => {
        if (e.regNumber === req.query.regNumber) {
          obj = e;
          obj.brand = req.body.brand;
          obj.date = req.body.date;
          obj.location = req.body.location;
          obj.image = req.body.image;
          obj.price = req.body.price;
  
          console.log("Obj = ", obj);
          response = e.save(obj);
        }
      });
      resp.json(await response);
    } catch (err) {
      resp.json({ "message : ": err });
    }
  });

  router.delete("/", async (req, resp) => {
    console.log("deleteeee")
    try {
      let arr = await Cars.find();
      let response = undefined;
      arr.forEach(async (e) => {
        if (e.regNumber === req.query.regNumber) {
          response = await e.remove();
        }
      });
      resp.json(response);
    } catch (err) {
      resp.json({ "message : ": err });
    }
  });

module.exports = router;