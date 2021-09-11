const express = require("express");
const cors = require('cors');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

//api routes
app.use('/users', require('./users/users.conroller'));
app.use('/content', require('./content/content.controller'));
app.use('/subject', require('./subject/subject.controller'));

//global error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});