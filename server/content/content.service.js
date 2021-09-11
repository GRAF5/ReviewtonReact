const db = require('../_helpers/db');
const Group = db.Group;
const Category = db.Category;
const Atribute = db.Atribute;

module.exports = {
    createGroup,
    deleteGroup,
    updateGroup,
    getAllGroup,
    getGroupById
};

async function createGroup(params){
    //validate
    var errors = [];
    if(await Group.findOne({name: params.name})){
        errors.push("Группа с именем " + params.name + " уже создана");
    }
    
    var categories = [];
    if(params.categories)
    for(var i = 0; i < params.categories.length; i++){
        await createCategory(params.categories[i])
            .then(_id => {
                categories.push(_id);
            })
            .catch(errs => {
                errs.forEach(err => {
                errors.push(err)});
            }); 
    }
        
    if(errors.length > 0) throw errors;

    var group = new Group({name: params.name, categories: categories});
    await group.save(function(error, result){if(error) {}});
}

async function createCategory(params){
    var errors = [];       
    if(await Category.findOne({ name: params.name})){
        errors.push("Категория с именем " + params.name + " уже создана");
    }
    
    if(errors.length > 0) throw errors;

    var atributes = [];
    if(params.atributes)
    for(var i = 0; i < params.atributes.length; i++){
        await createAtribute(params.atributes[i])
            .then(_id => {
                //params.atributes[i] = _id;
                atributes.push(_id);
            })
            .catch(errs => {
                erros.forEach(err => {
                    errors.push(err)});
            }); 
    }

    params.atributes = atributes;
    const category = new Category(params);
    await category.save();
    return category._id;
}
async function createAtribute(params){ 
    const atribute = new Atribute(params);
    await atribute.save()
    return atribute._id;
}

async function updateGroup(params){
    var group;
    await Group.findById(params.id, function(err, adventure){
        group = adventure;
    });
    //validate
    if(!group) throw "Группа "  + params.name + " не найдена";
    var errors = [];       
    if(group.name !== params.name && await Group.findOne({name: params.name})){
        errors.push("Группа с именем " + params.name + " уже создана");
    }

    var categories = [];
    if(params.categories)
    for(var i = 0; i < params.categories.length; i++){
        if(!params.categories[i].id){
            //create new categories
            await createCategory(params.categories[i])
                .then(_id => {
                    //params.categories[i] = _id;
                    categories.push(_id);
                })
                .catch(errs => {
                    errs.forEach(err => {
                    errors.push(err)});
                }); 
        }
        else{
            //uзdate existing categories
            await updateCategory(params.categories[i])
                .then(id => {
                    //params.categories[i] = _id;
                    categories.push(id);
                })
                .catch(errs => errors.push(err));
        }
    } 
    
    if(errors.length > 0) throw errors;

    params.categories = categories;
    Object.assign(group, params);
    await group.save();
}

async function updateCategory(params){
    var category;
    await Category.findById(params.id, function(err, adventure){
        category = adventure;
    });

    var errors = [];       
    if(!category) throw "Категория "  + params.name + " не найдена";    
    if(category.name !== params.name && await Category.findOne({name: params.name})){
        errors.push("Категория с именем " + params.name + " уже создана");
    }

    var atributes = [];
    if(params.atributes)
    for(var i = 0; i < params.atributes.length; i++){
        if(!params.atributes[i].id){
            //create new atributes
            await createAtribute(params.atributes[i])
                .then(_id => {
                    //params.atributes[i] = _id;
                    atributes.push(_id);
                })
                .catch(errs => {
                    errs.forEach(err => {
                    errors.push(err)});
                }); 
        }
        else{
            //update existing atributes
            await updateAtribute(params.atributes[i])
                .then(id => {
                    //params.atributes[i] = _id;
                    atributes.push(id);
                })
                .catch(errs => {
                    errs.forEach(err => {
                    errors.push(err)});
                }); 
        }
    } 
    
    if(errors.length > 0) throw errors;
    params.atributes = atributes;
    const doc = Object.assign(category, params);

    await doc.save();

    return doc.id;
}

async function updateAtribute(params){
    var atribute;
    await Atribute.findById(params.id,function(err, adventure){
        atribute = adventure;
    });

    if(!atribute) throw "Атрибут "  + params.name + " не найден";    
    
    const doc = Object.assign(atribute, params);

    await doc.save();

    return doc.id;
}

async function getAllGroup(){
    return await Group.find();
}

async function getGroupById(params){
    return await Group.findById(params.id)
        .populate([{
            path: 'categories',
            model: 'Category',
            populate: {
                model: 'Atribute',
                path: 'atributes'
            }
        }]).exec();
}

async function deleteGroup(params){
    await Group.findByIdAndDelete(params.id);
        
}