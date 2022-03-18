const mongoose = require('mongoose');
const Bhaktidham = require('../models/bhaktidham');

mongoose.connect('mongodb://localhost:27017/jinalaya', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await Bhaktidham.deleteMany({});
    for(let i = 0; i < 5; i++){
        const dham = new Bhaktidham({
            location: "India",
            title: "Derasar" + i,
            mulnayak: "Adinath",
            image:'https://images.unsplash.com/photo-1609151745346-c624e507baa2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80',
            description:'Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!'
        });
        await dham.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})