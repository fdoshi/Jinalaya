const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email:  {
        type: String,
        required: true,
        unique: true
    }          
});

userSchema.plugin(pLocalMongoose);

module.exports = mongoose.model('User', userSchema);
