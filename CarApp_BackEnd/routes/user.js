const express = require('express')
const app = express()
const router = express.Router()

const User = require('../model/user.model')


app.use(express.json())

router.get('/', async (req, res) => {
   // res.send("awaaaaaaaaaaaa")
   try {
      const user = await User.find()
      res.json(user)
   } catch (err) {
      res.send('Err: ' + err)
   }
})
router.get("/login", async (req, resp) => {
   try {
      console.log("awaaaaaaaaaaaa")
     let res = await User.find();
     console.log(res)
     let response = undefined;
     res.forEach(async (e) => {
      console.log(e.email)
       if ((e.email === req.query.email) & (e.password === req.query.password)) {
         response = true;
       }
     });
     resp.json(response);
   } catch (err) {
     resp.json({ message: err });
   }
 });


router.post('/', async (req, res) => {
   const user = new User({
      name: req.body.name,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email
   })

   try {
      const response = await user.save()
      res.json(response)
   } catch (err) {
      res.send('Err: ' + err)
   }
})
router.delete("/:_id",async(req,resp)=>{
   try{
      console.log("awaaaaaaaaaaaa")
       const user = await User.findById(req.params._id);
       const response = await user.remove()
       resp.json(response);
   }catch(err){
       resp.json(err);
   }
})

module.exports = router