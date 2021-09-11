const mongoose = require('mongoose');
//const contentService = require('../content.service');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {type: String, unique: true, required: true},
    atributes: [{type: Schema.Types.ObjectId, ref: 'Atribute'}],
    _creator: {type: Schema.Types.ObjectId, ref: 'Group'}
});

schema.set('toJSON', {
    virtuals:true,
    versionKey: false,
    transform: function(doc, ret){
        delete ret._id;
    }
});

schema.post('findOneAndDelete', async function(doc){
    for(var i = 0; i<doc.atributes.length; i++){
        await mongoose.model('Atribute').findByIdAndDelete(doc.atributes[i]);
        //await contentService.deleteAtribute(doc.atributes[i]);
    }
});

schema.post('save', async function(doc){
    await mongoose.model('Atribute').find({_creator: doc._id, _id:{$nin: doc.atributes}}, async function(err, docs){
        for(var i = 0; i< docs.length; i++){
            await mongoose.model('Atribute').findByIdAndDelete(docs[i]._id);
        }
    });
    for(var i = 0; i<doc.atributes.length; i++){
        await mongoose.model('Atribute').findById(doc.atributes[i])
            .then((atribute) => {
                atribute._creator = doc._id;
                atribute.save();
            })
    }
});

module.exports = mongoose.model('Category', schema);