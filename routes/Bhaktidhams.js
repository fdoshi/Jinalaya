const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/expressError');
const Bhaktidham = require('../models/bhaktidham');
const {bhaktidhamSchema} = require('../joiSchemas.js');
const {isLoggedIn, isAuthor, validateBhaktidham} = require('../middleware');

router.get('/', catchAsync (async (req, res) => {
    const bhaktidhams = await Bhaktidham.find({});
    res.render('bhaktidhams/index', { bhaktidhams })
}));
router.get('/new', isLoggedIn, (req, res) => {
    res.render('bhaktidhams/new');
});
router.post('/', isLoggedIn, validateBhaktidham, catchAsync (async (req, res) => {
    const bhaktidham = new Bhaktidham(req.body.bhaktidham);
    await bhaktidham.save();
    req.flash('success', 'Created new post Successfully');
    res.redirect(`/bhaktidhams/${bhaktidham._id}`)
}));
router.get('/:id', catchAsync (async (req, res) => {
    const bhaktidham = await Bhaktidham.findById(req.params.id).populate({
        path: 'reviews',
        populate:{
            path: 'author'
        }
    }).populate('author');
    console.log(bhaktidham);
    if(!bhaktidham){
        req.flash('errpr', 'Cannot find bhaktidaham you are looking for!');
        return res.redirect('/bhaktidhams');
    }
    res.render('bhaktidhams/show', {bhaktidham});
}));
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync (async (req, res) => {
    const { id } = req.params;
    const bhaktidham = await Bhaktidham.findById(req.params.id)
    if (!bhaktidham) {
        req.flash('error', 'Cannot find that bhaktidham for edit!');
        return res.redirect('/bhaktidhams');
    }
    res.render('bhaktidhams/edit', { bhaktidham });
}));
router.put('/:id', isLoggedIn, isAuthor, validateBhaktidham, catchAsync (async (req, res) => {
    const { id } = req.params;
    const bhaktidham = await Bhaktidham.findByIdAndUpdate(id, { ...req.body.bhaktidham });
    req.flash('success', 'Successfully updated the bhaktidham!');
    res.redirect(`/bhaktidhams/${bhaktidham._id}`)
}));
router.delete('/:id', catchAsync (async (req, res) => {
    const { id } = req.params;
    await Bhaktidham.findByIdAndDelete(id);
    req.flash('success', 'Entry is deleted successfully')
    res.redirect('/bhaktidhams');
}));

module.exports = router;