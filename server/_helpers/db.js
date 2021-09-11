const config = require('../config.json');
const mongoose = require('mongoose');
const connectionOptions = {
    useCreateIndex: true, 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false    
};
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    //Categories
    Group: require('../content/models/group.model'),
    Category: require('../content/models/category.model'),
    Atribute: require('../content/models/atribute.model'),
    Value: require('../content/models/value.model'),
    //Subjects
    Article: require('../subject/models/article.model'),
    Product: require('../subject/models/product.model'),
    Country: require('../subject/models/country.model'),
};
