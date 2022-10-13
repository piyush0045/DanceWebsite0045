const express=require("express"); //Import module Express
const path = require("path"); //For Static Files
const app=express(); //Created Express App
const port=8000; //Port 8000
//Mongodb
const mongoose = require('mongoose'); //Included Mongoose
const bodyparser=require("body-parser"); //To save data by express in mondodb 
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true}); //Connected to database

//Define mongoose schema - Format in which data is saved
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
 });

var Contact= mongoose.model('Contact', contactSchema); //Finalising Schema

//Express static stuff
app.use('/static', express.static('static'))  // For serving static files
app.use(express.urlencoded()) //For Storing Data In Express

//Pug specific stuff
app.set('view engine', 'pug')  // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

//End Points
app.get("/",(req,res)=>{    //Request,Response
    const params = {}
    res.status(200).render('home.pug',params); //To render contact
})

  app.get("/contact",(req,res)=>{    //Request,Response
      const params = {}
      res.status(200).render('contact.pug',params);
  })

//To save data
app.post("/contact",(req,res)=>{    //Request,Response
        var myData = new Contact(req.body);
        myData.save().then(()=>{  
        res.send("This item has been saved to the database")
         }).catch(()=>{
         res.status(400).send("item was not saved to the databse")
    })
 
   // res.status(200).render('contact.pug');
})

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
})