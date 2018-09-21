var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var dataConnection = require('../database/connect').dataDbConnection;

var dataSchema = new Schema({
        data: Schema.Types.Mixed,
        identifier: String
    },
    {collection: 'template_data'});

var DataModel = dataConnection.model("Template", dataSchema);

module.exports = DataModel;