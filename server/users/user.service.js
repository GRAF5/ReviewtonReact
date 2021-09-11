const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const User = db.User;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({email, password}){
    const user = await User.findOne({email});
    if(user && bcrypt.compareSync(password, user.hash)){
        const token = jwt.sign({sub: user.id}, config.secret, {expiresIn: '7d'});
        return{
            ...user.toJSON(),
            token
        }
    }
}

async function getAll(){
    return await User.find();
}

async function getById(id){
    return await User.findById(id);
}

async function create(userParam){
    //validate
    var errors = [];
    if(await User.findOne({username: userParam.username})){
        errors.push("Имя пользователя " + userParam.username + " занято");
    }
    if(await User.findOne({email: userParam.email})){
        errors.push("Электронная почта " + userParam.email + " занята");
    }
    if(errors.length > 0) throw errors;

    const user = new User(userParam);

    //hash password
    if(userParam.password){
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    //save user
    await user.save();
}

async function update(id, userParam){
    const user = await User.findById(id);

    //validate
    if(!user) throw 'Пользователь не найден';
    if(user.username !== userParam.username && await User.findOne({username: userParam.username})){
        throw 'Имя пользователя "' + userParam.username + '" занято';
    }

    //hash password if it was entered
    if(userParam.password){
        userParam.hash = bcrypt.hashSync(userParam.password,10);
    }

    //copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id){
    await User.findByIdAndRemove(id);
}