const mongoose = require('mongoose');
const { Schema } = mongoose;
const { validateEmail } = require('../validation');
const commentSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        require: true
    }
}, { timestamps: true });
commentSchema.pre('validate', function (next) {
    const err = {};
    if (!validateEmail(this.email)) {
        err.email = 'Invalid Email';
    }
    if (this.username.length < 5 || this.username.length > 15) {
        err.username = 'name must be between 5 to 15';
    }
    if (this.comment.length < 10) {
        err.comment = 'comment must be more than 10 charcters';
    }
    if (!this.rating) {
        err.rating = 'please provide rating';
    }
    if (Object.keys(err).length > 0) {
        next(err);
    }
    next();
})
module.exports = mongoose.model('Comments', commentSchema);