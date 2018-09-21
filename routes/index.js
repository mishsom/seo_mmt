var express = require('express');
var router = express.Router();
var routeResolver = require('../route_resolver/routeResolver');
var handleBar = require('handlebars');
require('../templateHelpers/helpers');
/* GET home page. */

router.get('/test/', function (req, res) {
    var html = "{{#each star}} <li> <h2>{{starName}}</h2>{{#each this.remainder}} <div class='fa fa-star-o' aria-hidden='true'>{{this.test}}</div>{{/each}}</li> {{/each}}";
    var htmlString = handleBar.compile(html);
    return res.send(htmlString(
        {
            star: [
                {remainder: [{test:'hello11'}, {test:'hello12'}], starName: 'star1'},
                {remainder: [{test:'hello21'}, {test:'hello22'}], starName: 'star2'}
            ]
        }
    ));
});
router.get('/seo/*', function (req, res) {

    var path = req.path;

    routeResolver.getTemplate(path, function (err, template) {
        if (err) {
            err.status = 404;
            return res.render('error', {'message': 'the page you are looking for is not available', 'error': err});
        }
        routeResolver.getDataForTemplate(path, function (err, data) {
            if (err) {
                err.status = 404;
                return res.render('error', {'message': 'the page you are looking for is not available', 'error': err});
            }
            var htmlString = handleBar.compile(template);
            return res.send(htmlString(data));
        })
    });
});

module.exports = router;
