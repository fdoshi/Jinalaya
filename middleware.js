const { bhaktidhamSchema, reviewSchema } = require('./joiSchemas.js');
const ExpressError = require('./utils/expressError');
const Bhaktidham = require('./models/bhaktidham');
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
    // console.log("Req.User..", req.user);
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'Please sign up or login.');
        return res.redirect('/login');
    }
    next();
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.validateBhaktidham = (req, res, next) => {
    const { error } = bhaktidhamSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}
module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const bhaktidham = await Bhaktidham.findById(id);
    if (!bhaktidham.author.equals(req.user._id)) {
        req.flash('error', 'You are not authorised for this action!');
        return res.redirect(`/bhaktidhams/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have Author permission!');
        return res.redirect(`/bhaktidhams/${id}`);
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}