function normalizeString(str){
    return str.normalize('NFKC').replace(/ /g,"").toUpperCase();
}

module.exports = normalizeString;