var request = require('request')
  , querystring = require('querystring')
//  , zlib = require('zlib')
  , fs = require('fs')
  , outputFilePath = __dirname + '/../duel.min.js';

var params = {
    'output_format': 'json',
    'output_info': 'compiled_code',
    'compilation_level': 'SIMPLE_OPTIMIZATIONS',
    'warning_level': 'default',
    'js_code': fs.readFileSync(__dirname + '/duel.cat.js').toString('utf8')
};

request.post(
    {
        url: 'http://closure-compiler.appspot.com/compile',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'user-agent': 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)'//,
            //'accept-encoding': 'gzip,deflate'
        },
        body: querystring.stringify(params)
    },
    function(err, res, body) {
        if (err) {
            console.log(err);
            return;
        }
        fs.unlinkSync(outputFilePath);
        fs.writeFileSync(outputFilePath, JSON.parse(body.toString('utf8'))['compiledCode'], 'utf8');
    }
);
