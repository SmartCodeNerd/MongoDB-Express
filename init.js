const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
.then((res) => {
    console.log("Connection Succesful");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Whatsapp");
}

Chat.insertMany([
    {
        from:"Mummy",
        to:"Ankita",
        msg:"What are you doing?",
        createdAt: new Date(),
    },
    {
        from:"Notice Board",
        to:"Me",
        msg:"SE Class Cancelled",
        createdAt: new Date(),
    },
    {
        from:"Muskan",
        to:"Goldie",
        msg:"I Love You Baby",
        createdAt: new Date(),
    },
    {
        from:"Sashi",
        to:"Priya",
        msg:"Send me your Exam Datesheet",
        createdAt: new Date()
    },
    {
        from:"Goldie",
        to:"Utsab",
        msg:"Happy Birthday Brother",
        createdAt: new Date()
    },
]);



