const express = require('express');
const router = express.Router();
const fs = require("fs");
var images = Array();

fs.readdir("./Portfolio/",(err,files)=>{
         files.forEach(file => {
                         images.push(file);
          console.log("działa");
        });

      });


router.use((req,res,next)=>{
if(images.length<1){
  listDirectory().then(()=>next());
}
else
next();
});




router.get("/",(req,res)=>{
 res.send(JSON.parse(JSON.stringify(images)));
});

router.get("/count",(req,res)=>{
  res.send({'count':images.length});
});

router.get("/:index",(req,res)=>{
 res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({"path":images[req.params.index]}));
});






module.exports = router;
