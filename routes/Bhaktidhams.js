const express = require('express');
const router = express.Router();
const bhaktidhams = require('../controllers/bhaktidham');
const catchAsync = require('../utils/catchAsync');
//const ExpressError = require('../utils/expressError');
//const {bhaktidhamSchema} = require('../joiSchemas.js');
const {isLoggedIn, isAuthor, validateBhaktidham} = require('../middleware');

const Bhaktidham = require('../models/bhaktidham');

router.route('/')
.get(catchAsync (bhaktidhams.index))
.post(isLoggedIn, catchAsync (bhaktidhams.createBhaktidham))

router.route('/new')
.get(isLoggedIn, bhaktidhams.getNewForm )

router.route('/:id')
.get(catchAsync (bhaktidhams.showBhaktidham))
.put(isLoggedIn, isAuthor, validateBhaktidham, catchAsync (bhaktidhams.updateBhaktidham))
.delete(catchAsync (bhaktidhams.deleteDham))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync (bhaktidhams.getEditForm));



module.exports = router;