var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var templateConnection = require('../database/connect').templateDbConnection;

var templateSchema = new Schema({
        html: String,
        template: String
    },
    {collection: 'templates'});

var Template = templateConnection.model("Template", templateSchema);

module.exports = Template;