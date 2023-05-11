const Bhaktidham = require('../models/bhaktidham');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const bhaktidham = await Bhaktidham.findById(req.params.id);
    //const { review } = req.body;
    //const reviewAuthor = req.user._id;
    //console.log(review.body)
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    await newReview.save();
    console.log(newReview)    
    bhaktidham.reviews.push(newReview._id)
    console.log("dham reviews: " + bhaktidham.reviews)
    await bhaktidham.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/bhaktidhams/${bhaktidham._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Bhaktidham.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/bhaktidhams/${id}`);
}