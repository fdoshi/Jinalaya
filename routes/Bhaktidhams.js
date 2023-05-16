const express = require('express');
const router = express.Router();
const bhaktidhams = require('../controllers/bhaktidham');
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, isAuthor, validateBhaktidham} = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
//const ExpressError = require('../utils/expressError');
//const {bhaktidhamSchema} = require('../joiSchemas.js');
//const Bhaktidham = require('../models/bhaktidham');

router.route('/')
.get(catchAsync (bhaktidhams.index))
.post(isLoggedIn, upload.array('image'), validateBhaktidham, catchAsync (bhaktidhams.createBhaktidham))

router.route('/new')
.get(isLoggedIn, bhaktidhams.getNewForm )

router.route('/:id')
.get(catchAsync (bhaktidhams.showBhaktidham))
.put(isLoggedIn, isAuthor, upload.array('image'), validateBhaktidham, catchAsync (bhaktidhams.updateBhaktidham))
.delete(isLoggedIn, isAuthor, catchAsync (bhaktidhams.deleteDham))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync (bhaktidhams.getEditForm));

module.exports = router;