const AccesControl = require('accesscontrol');
const ac = new AccesControl();

exports.roles(function() {
    ac.grant("user");
    ac.grant("admin")
        .extend("user")
        .addAny("group")
        .updateAny("group")
        .deleteAny("group");

    return ac;
})();