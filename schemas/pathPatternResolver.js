var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var templateConnection = require('../database/connect').routeDbConnection;

var routePatternDbSchema = new Schema({
        numberOfSlashes: {
            type: Number,
            unique: true
        },
        templatePosition: Number,
        dataPosition: Number
    },
    {collection: 'routePatterns'});

var RoutePattern = templateConnection.model("RoutePattern", routePatternDbSchema);

module.exports = RoutePattern;