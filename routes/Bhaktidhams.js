const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/expressError');
const Bhaktidham = require('../models/bhaktidham');
const {bhaktidhamSchema} = require('../joiSchemas.js');

const validateBhaktidham = (req, res, next) => {
    const { error } = bhaktidhamSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.get('/', catchAsync (async (req, res) => {
    const bhaktidhams = await Bhaktidham.find({});
    res.render('bhaktidhams/index', { bhaktidhams })
}));
router.get('/new', (req, res) => {
    res.render('bhaktidhams/new');
});
router.post('/', validateBhaktidham, catchAsync (async (req, res) => {
    const bhaktidham = new Bhaktidham(req.body.bhaktidham);
    await bhaktidham.save();
    req.flash('success', 'Created new post Successfully');
    res.redirect(`/bhaktidhams/${bhaktidham._id}`)
}));
router.get('/:id', catchAsync (async (req, res) => {
    const bhaktidham = await Bhaktidham.findById(req.params.id)
    res.render('bhaktidhams/show', {bhaktidham});
}));
router.get('/:id/edit', catchAsync (async (req, res) => {
    const bhaktidham = await Bhaktidham.findById(req.params.id)
    res.render('bhaktidhams/edit', { bhaktidham });
}));
router.put('/:id', validateBhaktidham, catchAsync (async (req, res) => {
    const { id } = req.params;
    const bhaktidham = await Bhaktidham.findByIdAndUpdate(id, { ...req.body.bhaktidham });
    res.redirect(`/bhaktidhams/${bhaktidham._id}`)
}));
router.delete('/:id', catchAsync (async (req, res) => {
    const { id } = req.params;
    await Bhaktidham.findByIdAndDelete(id);
    res.redirect('/bhaktidhams');
}));

module.exports = router;