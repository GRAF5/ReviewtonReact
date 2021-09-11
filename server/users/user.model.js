const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: {type: String, unique: true, required: true},
    hash: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    role: {type: String, enum : ['user','admin'], default: 'user'}
});
schema.path('role').options.enum;
schema.set('toJSON', {
    virtuals:true,
    versionKey: false,
    transform: function(doc, ret){
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('User', schema);