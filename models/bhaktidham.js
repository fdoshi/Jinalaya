const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const BhaktidhamSchema = new Schema({
    title: String,
    description: String,
    location: String,
    image: String,
    mulnayak: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

BhaktidhamSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
});

module.exports = mongoose.model('Bhaktidham', BhaktidhamSchema);