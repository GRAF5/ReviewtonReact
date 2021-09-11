const { Article, Product, Value, Atribute, Country } = require('../_helpers/db');
const db = require('../_helpers/db');
const normalizeString = require('../_helpers/normalize');

module.exports = {
    createArticle,
}

async function createArticle(params){
    var errors = [];
    var pr;
    if(!params.product.id){
        await createProduct(params.product)
            .then(product => pr = product)
            .catch(errs => {
                console.log(errs);
                errs.forEach(err => {
                errors.push(err)});
            }); 
    }
    else{
        await Product.findById(params.product.id, function(err, prod){
            pr = prod;
        });
    }
    
    if(errors.length > 0) throw errors;

    var article = new Article({rating: params.rating, text: params.text, createTime: Date.now(), author: params.author});

    await article.save();
    pr.articles.push(article._id);
    await pr.save();
}

async function createProduct(params){
    var errors = [];
    var product;
    await Product.findOne({normalizedName: normalizeString(params.name)}, function(err, p){
        product = p;
    });
    if(product){
        return product;
    }

    var values = [];
    if(!params.values || params.values.length == 0) errors.push("Не указаны значения атрибутов!");
    else
    for(var i = 0; i < params.values.length; i++){
        await createValue(params.values[i])
            .then(_id => {
                values.push(_id);
            })
            .catch(errs => {
                errs.forEach(err => {
                errors.push(err)});
            }); 
    }
    var country;
    await createCountry(params.country)
        .then(_id => {
            country = _id;
        })
        .catch(errs => {
            errs.forEach(err => {
            errors.push(err)});
        }); 
    if(errors.length > 0) throw errors;

    product = new Product({name: params.name, normalizedName: normalizeString(params.name), values:values, articles:[], country: country});
    return product;
}

async function createValue(params){
    var value;

    await Value.findOne({normalizedValue: normalizeString(params.value), _creator: params.creator}, function(err, v){
        value = v;
    })
    if(value){
        return value._id;
    }

    value = new Value({value: params.value, _creator: params.creator, normalizedValue: normalizeString(params.value)});
    await value.save();

    var atribute;
    await Atribute.findById(params.creator, function(err, atr){
        atribute = atr;
    });
    atribute.values.push(value._id);
    await atribute.save();

    return value._id;
}

async function createCountry(params){
    var country;

    await Country.findOne({normalizedName: normalizeString(params.name)}, function(err, c){
        country = c;
    })
    if(country){
        return country._id;
    }

    country = new Country({name: params.name, normalizedName: normalizeString(params.name)});
    await country.save();

    return country._id;
}