const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const flash = require('express-flash');
const session = require('express-session');

//Setting up for EJS Files
app.set("views" , path.join(__dirname, "views"));
app.set("views engine","ejs");


//Setting up for the Static files(public directory)
app.use(express.static(path.join(__dirname , "public/CSS")));
app.use(express.static(path.join(__dirname , "public/JS")));

//To Read Incoming Data
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//To Send PATCH Request
app.use(methodOverride("_method"));

app.use(session({
    secret: 'your_secret_key',  // Change this to a secure key
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

main()
.then(() => {
    console.log("Connection Successful");
})
.catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Whatsapp");
}

//Listening to API Requests.
app.listen(port,() => {
    console.log("Server Started Listening");
})

//Sending Response to Every Route
// app.use((req,res) => {
//     res.send("Hello");
// })

//Index Route-To show all Chats.
app.get("/chats", async (req,res) => {
    let chats = await Chat.find({});
    res.render("index.ejs",{chats});
});

//New Route
app.get("/chats/new",(req,res) => {
    //res.send("Success");
    res.render("newChat.ejs");
})

//Create Route
app.post("/chats" , (req,res) => {
    let {from, to, msg} = req.body;

    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        createdAt: new Date()
    })

    newChat.save()
    .then(() => {
        console.log("Saved Successfully");
    })
    .catch((err) => {
        res.send(err);
    });

    res.redirect("/chats");
});

//Edit Route
app.get("/chats/:id/edit" , (req,res) => {
    let id = req.params;

    Chat.findById(id.id)
    .then((data) => {
        //console.log(data);
        res.render("edit.ejs",{data});
    })
    .catch((err) => {
        res.send(err);
    });
})

//Update Route
app.put("/chats/:id" , (req,res) => {
    let newMsg = req.body.msg;
    let id = req.params;

    Chat.findByIdAndUpdate((id.id), {msg:newMsg,createdAt:new Date()},{new:true})
    .then((data) => {
        console.log(data)
    })
    .catch((err) => {
        res.send(err);
    });

    res.redirect("/chats");
})

//Destroy Route
app.delete("/chats/:id" , (req,res) => {
    //res.send("Deleted");
    let id = req.params;
    //alert("Are you sure");
    req.flash("Are you sure!");
    Chat.findByIdAndDelete((id.id))
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        res.send(err);
    })

    res.redirect("/chats");
    
})

app.get("/bada",(req,res) => {
    res.status(400);
})