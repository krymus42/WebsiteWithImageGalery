
const express = require('express');
const app = express();
const path = require("path");
const portfolio = require('./portfolio_route.js');
const port  = 3000;

app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/Portfolio'));
app.use(express.static(__dirname + '/Styles'));
app.use(express.static(__dirname + '/Scripts'));
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname+"/HTML/index.html"));
});

app.get("/resume",(req,res)=>{
  res.sendFile(path.join(__dirname+"/pdf/test.pdf"));
});


app.get("/font",(req,res)=>{
  req.url({url:"http://pl.allfont.net/allfont.css?fonts=playfair-display"},(err,res,body)=>{
 if (err,res.statusCode!=200){
    console.log("unable to load font");
    res.end();
  }
else {
  res.send(JSON.parse(body));
}
  });
});
app.listen(port,()=> console.log(`Listening on port ${port}`));
app.use('/portfolio',portfolio);
