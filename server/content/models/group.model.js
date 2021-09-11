const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {type: String, unique: true, required: true},    
    categories: [{type: Schema.Types.ObjectId, ref: 'Category'}]
});

schema.set('toJSON', {
    virtuals:true,
    versionKey: false,
    transform: function(doc, ret){
        delete ret._id;
    }
});

schema.post('findOneAndDelete', async function(doc){
    for(var i = 0; i<doc.categories.length; i++){
        await mongoose.model('Category').findByIdAndDelete(doc.categories[i]);
    }
});

schema.post('save', async function(doc){
    await mongoose.model('Category').find({_creator: doc._id, _id:{$nin: doc.categories}}, async function(err, docs){
        for(var i = 0; i< docs.length; i++){
            await mongoose.model('Category').findByIdAndDelete(docs[i]._id);
        }
    });
    for(var i = 0; i<doc.categories.length; i++){
        await mongoose.model('Category').findById(doc.categories[i])
            .then((category) => {
                category._creator = doc._id;
                category.save();
            })
    }
});

module.exports = mongoose.model('Group', schema);