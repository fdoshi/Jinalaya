const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/expressError');
const { reviewSchema } = require('../joiSchemas.js');
const Bhaktidham = require('../models/bhaktidham');
const Review = require('../models/review');
const {isLoggedIn, isReviewAuthor, validateReview} = require('../middleware');

router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res) => {
    const bhaktidham = await Bhaktidham.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    bhaktidham.reviews.push(review);
    await review.save();
    await bhaktidham.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/bhaktidhams/${bhaktidham._id}`);
}))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Bhaktidham.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/bhaktidhams/${id}`);
}))

module.exports = router;