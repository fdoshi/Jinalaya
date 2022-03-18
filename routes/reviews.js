const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/expressError');
const { reviewSchema } = require('../joiSchemas.js');
const Bhaktidham = require('../models/bhaktidham');
const Review = require('../models/review');

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}



router.post('/', validateReview, catchAsync(async (req, res) => {
    const bhaktidham = await Bhaktidham.findById(req.params.id);
    const review = new Review(req.body.review);
    bhaktidham.reviews.push(review);
    await review.save();
    await bhaktidham.save();
    res.redirect(`/bhaktidhams/${bhaktidham._id}`);
}))

router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Bhaktidham.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/bhaktidhams/${id}`);
}))

module.exports = router;