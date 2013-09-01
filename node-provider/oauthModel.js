/**
 * Created with JetBrains WebStorm.
 * User: tomek
 * Date: 8/31/13
 * Time: 1:17 PM
 * To change this template use File | Settings | File Templates.
 */
var model = module.exports;
var mongo = require('mongoskin');

var tokenDb = mongo.db('localhost:27017/oauth_test');
var tokenCollection = tokenDb.collection('oauth_tokens');


var tokens = [];

model.getAccessToken = function(bearerToken, callback) {
//    console.log("Checking for access token: "+bearerToken);

    tokenCollection.findOne({accessToken:bearerToken}, {}, function(err,cursor) {
        if (err) {
            callback(true);
        } else {
            callback(false, cursor);
        }
    });
};

model.getClient = function (clientId, clientSecret, callback) {
    if (clientId == '12345') {
        callback(false, { client_id : '12345' });
    } else {
        callback(true, null);
    }
};


model.grantTypeAllowed = function(clientId, grantType, callback) {
    callback(false, (grantType === 'password'));
};

model.saveAccessToken = function(accessToken, clientId, userId, expires, callback) {
    var token = {
        accessToken: accessToken,
        clientId: clientId,
        userId: userId,
        expires: expires,
        created: new Date()
    };
    //tokens.push(token);
    tokenCollection.insert(token);
    console.log('Saved token ',token);
    callback(false);
};

model.getUser = function(username, password, callback) {
    if (username == 'foo' && password == 'bar') {
        callback(false, { id: 'user'+username } );
    } else {
        callback(true, null);
    }
};





