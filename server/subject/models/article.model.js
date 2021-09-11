const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    rating: {type: Number},
    text: {type: String},    
    createTime: {type: Date},
    author: {type: Schema.Types.ObjectId, ref: 'User'}
});

schema.set('toJSON', {
    virtuals:true,
    versionKey: false,
    transform: function(doc, ret){
        delete ret._id;
    }
});


module.exports = mongoose.model('Article', schema);