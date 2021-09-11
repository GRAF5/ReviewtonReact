const mongoose = require('mongoose');
const normalizeString = require('../../_helpers/normalize');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {type: String, unique: true, required: true},  
    normalizedName: {type: String},
    rating: {type: Number},
    values: [{type: Schema.Types.ObjectId, ref: 'Value'}],
    articles: [{type: Schema.Types.ObjectId, ref: 'Article'}],
    country: {type: Schema.Types.ObjectId, ref: 'Country'}
});

schema.set('toJSON', {
    virtuals:true,
    versionKey: false,
    transform: function(doc, ret){
        delete ret._id;
    }
});


schema.post('save', function(doc){
});

module.exports = mongoose.model('Product', schema);