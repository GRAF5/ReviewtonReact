const express = require('express');
const router = express.Router();
const subjectService = require('./subject.service');

router.post('/create-article', createArticle);

module.exports = router;

function createArticle(req, res, next){
    subjectService.createArticle(req.body)
        .then(() => res.json({}))
        .catch(err => { console.log(err);next(JSON.stringify(err))});
}