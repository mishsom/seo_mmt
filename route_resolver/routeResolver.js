var templateModel = require('../schemas/templateSchema');
var dataModel = require('../schemas/dataSchema');
var routerPatternModel = require('../schemas/pathPatternResolver');


// templateModel.findOne({template: req.params.template_name}, function (error, template) {
//     if(error) {
//         return res.send("Error");
//     }
//     dataModel.findOne({identifier: req.params.hotel_name}, function (error, data) {
//         if(error) {
//             return res.send("Error");
//         }
//
//     })
// });

function getCountOfSlash(path) {
    if(path)
        return path.split('/').length - 1;
    else
    return 0;
}

function getTemplateNameFromPath(path, callback) {
    var countOfSlashes = getCountOfSlash(path);
    if(path) {
        routerPatternModel.findOne({numberOfSlashes: countOfSlashes}, function (err, data) {
            if(err) {
                callback(err);
                return;
            }
            var tokens = path.split('/');
            if(!data || tokens.length < data.templatePosition || tokens.length < data.dataPosition) {
                return callback({'status': 404, 'message': 'the rul you are looking is not found.'});
            }
            callback(null, tokens[data.templatePosition]);
        })
    } else {
        callback({message: 'path is not defined', status: 404})
    }
}

function getTemplateDataNameFromPath(path, callback) {
    var countOfSlashes = getCountOfSlash(path);
    if(path) {
        routerPatternModel.findOne({numberOfSlashes: countOfSlashes}, function (err, data) {
            if(err) {
                callback(err);
                return;
            }
            var tokens = path.split('/');
            if(!data || tokens.length < data.templatePosition || tokens.length < data.dataPosition) {
                return callback({'status': 404, 'message': 'the rul you are looking is not found.'});
            }
            callback(null, tokens[data.dataPosition]);
        })
    } else {
        callback({message: 'path is not defined', status: 404})
    }
}

function getTemplate(path, callback) {
    getTemplateNameFromPath(path, function (err, templateName) {
        if(err){
            callback(err);
            return;
        }
        templateModel.findOne({template: templateName}, function (error, template) {
            if (error) {
                callback(error);
                return;
            }
            callback(null, template.html);
        });
    });
}


function getDataForTemplate(path, callback) {

    getTemplateDataNameFromPath(path, function (err, tempateDataKey) {
        if(err){
            callback(err);
            return;
        }
        dataModel.findOne({identifier: tempateDataKey}, function (error, data) {
            if(error) {
                callback(error);
                return;
            }
            var templateData = data.data;
            /**
             * TODO: add cdn paths
             */
            templateData["imageCdnPath"] = '';
            callback(null, data.data);
        });
    });

}

module.exports = {
    'getTemplate': getTemplate,
    'getDataForTemplate': getDataForTemplate
};