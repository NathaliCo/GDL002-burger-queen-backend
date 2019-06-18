const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'The email is required'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'The password is required'],
    },
    roles: {
        admin: {
            type: Boolean,
            required: [false, 'The role is required'],
        },
    },
});


UserSchema.pre('save', function save(next) {
    if (this.password.length === 60 && this.password[0] === '$') { // already encrypted
        return next();
    }

    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        this.password = hash;
        next();
    });
});


UserSchema.statics.authenticate = function auth(email, password, cb) {
    this.findOne({ email }, (err, user) => {
        if (err) {
            return cb(500);
        }

        if (!user) {
            return cb(404);
        }

        return bcrypt.compare(password, user.password, (err, result) => {
            if (result !== true) {
                return cb(403);
            }
            cb(null, user);
        });
    });
};


UserSchema.statics.findByIdOrEmail = function find(emailOrId, cb) {
    if (emailOrId.split('@').length === 2) {
        return this.findOne({ email: emailOrId }, cb);
    }
    return this.findById(emailOrId, cb);
};

//new
// userSchema.methods.toJSON = function() {

//         let userJSON = this;
//         let userObject = userJSON.toObject();
//         delete userObject.password;
//         return userObject;
//     }
//end New
UserSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('User', UserSchema)