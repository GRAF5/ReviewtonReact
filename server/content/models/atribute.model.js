const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {type: String, required: true},
    isArray: {type: Boolean},
    values: [{type: Schema.Types.ObjectId, ref: 'Value'}],
    _creator: {type: Schema.Types.ObjectId, ref: 'Category'}
});

schema.set('toJSON', {
    virtuals:true,
    versionKey: false,
    transform: function(doc, ret){
        delete ret._id;
    }
});


schema.post('findOneAndDelete', async function(doc){
    const values = mongoose.model('Value').find({_creator: doc._id});
    for(var i = 0; i < values.length; i++){
        await mongoose.model('Value').findByIdAndDelete(values[i]._id);
    }
});

module.exports = mongoose.model('Atribute', schema);