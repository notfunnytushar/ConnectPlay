const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');

const Campground = require('../models/campground');

router.route('/')
.get(isLoggedIn,catchAsync(campgrounds.index))
.post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))  

router.get('/new', isLoggedIn, campgrounds.renderNewForm)
router.get('/cricket', isLoggedIn, campgrounds.renderCricketForm) //here
router.get('/football', isLoggedIn, campgrounds.renderFootball) //here
router.get('/tennis', isLoggedIn, campgrounds.renderTennis) //here
router.get('/hockey', isLoggedIn, campgrounds.renderHockey) //here
router.get('/basketball', isLoggedIn, campgrounds.renderBasketball) //here
router.route('/search')
    .get(isLoggedIn,catchAsync(campgrounds.search))
    // .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))
  

router.route('/:id')
.get(catchAsync(campgrounds.showCampground))
.put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
.delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

router.post('/:id/update', isLoggedIn, catchAsync(campgrounds.updateParticipants));
router.get('/:id/edit', isLoggedIn , isAuthor, catchAsync(campgrounds.renderEditForm))

// router.route('/search')
//     .get(catchAsync(campgrounds.search))
//     .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))
// router.put('/:id/update-participant', isLoggedIn, isAuthor, catchAsync(campgrounds.updateParticipants));



module.exports = router;