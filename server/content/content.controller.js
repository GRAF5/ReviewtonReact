const express = require('express');
const router = express.Router();
const contentService = require('./content.service');

router.post('/create', create);
router.delete('/delete', deleteGroup);
router.put('/update', updateGroup);
router.get('/', getAll);
router.get('/:id', getById);

module.exports = router;

function create(req, res, next){
    contentService.createGroup(req.body)
        .then(() => res.json({}))
        .catch(err => next(JSON.stringify(err)));
}

function deleteGroup(req, res, next){
    contentService.deleteGroup(req.body)
        .then(() => res.json({}))
        .catch(err => next(JSON.stringify(err)));
}

function updateGroup(req, res, next){
    contentService.updateGroup(req.body)
        .then(() => res.json({}))
        .catch(err => next(JSON.stringify(err)));
}

function getAll(req, res, next){
    contentService.getAllGroup()
        .then(groups => res.json(groups))
        .catch(err => next(JSON.stringify(err)));
}

function getById(req, res, next){
    contentService.getGroupById(req.params)
        .then(group => group ? res.json(group) : res.sendStatus(404))
        .catch(err => next(JSON.stringify(err)));
}