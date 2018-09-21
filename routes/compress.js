var express = require('express');
var router = express.Router();
var minify = require('html-minifier').minify;
const { check, validationResult } = require('express-validator/check');


router.get('/html', function (req, res) {
    return res.send('compress');
});

    router.post('/html',[
        check('message')
            .isLength({ min: 10 })
            .withMessage('valid html is required to compress')
    ], function (req, res) {
    var data = minify(req.body);
   return res.send('compress', {'data': data, 'errors': errors.mapped()});
});

module.exports = router;
