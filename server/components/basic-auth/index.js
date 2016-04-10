'use strict';

var auth = require('basic-auth')

module.exports = function basicAuth(req, res, next) {
    var credentials = auth(req);
    if( !credentials || credentials.name !== 'rana' || credentials.pass !== 'rana' ) {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="RanaAPP"');
        res.end('Unauthorized access');
    } else {
        next();
    }
}