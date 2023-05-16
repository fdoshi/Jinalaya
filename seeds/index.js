const mongoose = require('mongoose');
const Bhaktidham = require('../models/bhaktidham');
const cities = require('./cities');

mongoose.connect('mongodb://127.0.0.1:27017/jinalaya', {
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
    for(let i = 1; i < 5; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const dham = new Bhaktidham({
            author: '645abd1c370801c0ddcaf515',
            reviews: [ {_id: "645bda22c8969e4c07c18ac3"}, {_id: "645d3909dd2eb47650be40c8"}],
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: "Derasar " + i,
            mulnayak: "Adinath",
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dztrvonhq/image/upload/v1684251395/Jinalaya/sup8sq4vefhotyopdx8a.jpg',
                    filename: 'Jinalaya/sup8sq4vefhotyopdx8a'
                },
                {
                    url: 'https://res.cloudinary.com/dztrvonhq/image/upload/v1684251396/Jinalaya/u5oqk3ui9wtvv71ifduz.jpg',
                    filename: 'Jinalaya/u5oqk3ui9wtvv71ifduz'
                }
            ],
            description:'Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!'
        });
        await dham.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})