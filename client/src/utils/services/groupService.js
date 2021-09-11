const handleResponse = require("./handleResponse");

module.exports = {
    getAllGroups,
    deleteById,
    getGroup,
    updateGroup,
    createGroup
}

function getAllGroups(){
    const requestOptions = {
        method: 'GET'
    }
    return fetch('/content/', requestOptions)
        .then(handleResponse)
        .then(groups => {
            return groups;
        });
}
function deleteById(id){
    const token = localStorage.token;
    const requestOptions = {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({id:id})

    }
    return fetch('/content/delete', requestOptions)
        .then(handleResponse);
}
function getGroup(id){
    const token = localStorage.token;
    const requestOptions = {
        method: 'GET',        
        headers: { 
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    return fetch('/content/'+id, requestOptions)
        .then(handleResponse)
        .then(group => {
            return group;
        });
}
function updateGroup(group){
    const token = localStorage.token;
    const requestOptions ={
        method: 'PUT',     
        headers: { 
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(group)
    };
    return fetch('/content/update', requestOptions)
        .then(handleResponse);
}
function createGroup(group){
    const token = localStorage.token;
    const requestOptions ={
        method: 'POST',     
        headers: { 
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(group)
    };
    return fetch('/content/create', requestOptions)
        .then(handleResponse);
}