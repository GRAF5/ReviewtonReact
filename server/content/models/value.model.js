const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    value: {type: String, required: true},
    normalizedValue: {type: String},
    _creator: {type: Schema.Types.ObjectId, ref: 'Atribute'},
});

schema.set('toJSON', {
    virtuals:true,
    versionKey: false,
    transform: function(doc, ret){
        delete ret._id;
    }
});


module.exports = mongoose.model('Value', schema);