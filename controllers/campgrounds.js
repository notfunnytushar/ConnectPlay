const Campground = require('../models/campground');
const updatedIds = new Set();
module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
}

module.exports.renderCricketForm = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/cricket', { campgrounds })
}
module.exports.renderFootball = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/football', { campgrounds })
}
module.exports.renderBasketball = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/basketball', { campgrounds })
}
module.exports.renderHockey = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/hockey', { campgrounds })
}
module.exports.renderTennis = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/tennis', { campgrounds })
}

  
module.exports.search = async (req, res) => {
    const myParam = req.query.search
    const campgrounds = await Campground.find({});
    const location = req.query.location;
    res.render('campgrounds/search', { campgrounds, myParam, location }); 
}

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
}






module.exports.createCampground = async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.showCampground = async (req, res,) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id)
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
}

module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/campgrounds');
}

module.exports.updateParticipants = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    
    const userId = req.user._id;
    const userEmail = req.user.email;  

    if (campground.appliedUsers.includes(userId)) {
      const index = campground.appliedUsers.indexOf(userId);
      campground.appliedUsers.splice(index, 1);
      campground.appliedEmails.splice(index, 1);  
      campground.participants++;
      req.flash('success', 'Application cancelled!');
    } else {
      if (campground.participants > 0) {
        campground.appliedUsers.push(userId);
        campground.appliedEmails.push(userEmail);  
        campground.participants--;
        req.flash('success', 'Application submitted!');
      } else {
        req.flash('error', 'Campground is already full!');
      }
    }
  
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
  };

