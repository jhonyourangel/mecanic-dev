let mongodb = require('mongodb');
let node_acl = require('acl');
let acl;

mongodb.connect('mongodb://127.0.0.1:27017/acl_example', _mongo_connected);


function _mongo_connected(error, db) {

    var mongoBackend = new node_acl.mongodbBackend(db /*, {String} prefix */ );

    // Create a new access control list by providing the mongo backend
    //  Also inject a simple logger to provide meaningful output
    acl = new node_acl(mongoBackend, logger());

    // Defining roles and routes
    //set_roles();
    //set_routes();
}

// This creates a set of roles which have permission
// on different resources.
function set_roles() {
    // Define roles, resources and permissions
    acl.allow([
        {
            roles: 'admin',
            allows: [
                { resources: '/secret', permissions: 'create'},
                { resources: '/topsecret', permissions: '*'}
            ]
        }, {
            roles: 'user',
            allows: [
                { resources: '/secret', permissions: 'get'}
            ]
        }, {
            roles: 'guest',
            allows: []
        }
    ]);

    // Inherit roles
    // Every user is allowed to do what guest do
    // Every admin us allowed to do what users do

    acl.addRoleParents('user', 'guest');
    acl.addRoleParents('admin', 'user');
}

// Generic debug logger for node_acl
function logger() {
    return {
        debug: function (msg) {
            console.log('-DEBUG-', msg);
        }
    };
}