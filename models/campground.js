const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: Number,
    description: {
        type: String,
        required: true
    },
    location: String,
    participants: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    appliedUsers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    appliedEmails: [String] 
});

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);
