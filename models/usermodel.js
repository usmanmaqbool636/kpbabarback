const mongoose = require('mongoose');
const { validateEmail } = require('../validation');
const bcrypt= require('bcrypt');
const { Schema } = mongoose;
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
userSchema.pre('validate', function (next) {
    const err = {};
    if (!validateEmail(this.email)) {
        err.email = 'invalid Email';
    }
    console.log(this.username.length);
    if (this.username.length < 5 || this.username.length > 15) {
        err.username = 'name must be between 5 to 15';
    }
    if (this.password.length < 5) {
        err.password = 'password must be more than 5 charcters'
    }
    if (Object.keys(err).length > 0) {
        next(err);
    }
    next();
})
userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, 10)
    next();
})


module.exports = mongoose.model('User', userSchema);