var fs = require('fs')
  , path = require('path')
  , outputFileName = 'duel.min.js'
  , encoding = 'utf8'
  , code = '';

(function(dir) {
    if (!path.existsSync(dir)) {
        console.log(dir + ' does not exist.');
        return;
    }
    fs.readdirSync(dir).forEach(function(fileOrDir) {
        if (fileOrDir == path.basename(__filename)) {
            return;
        }
        if (fileOrDir == outputFileName) {
            fs.unlinkSync(fs.realpathSync(fileOrDir));
            return;
        }
        if (fs.statSync(fileOrDir).isDirectory()) {
            arguments.callee(dir + '/' + fileOrDir);
            return;
        }
        code += fs.readFileSync(fileOrDir, encoding);
        code += "\n/************************************/\n";
        console.log(fs.realpathSync(fileOrDir));
    });
}(__dirname));

fs.writeFileSync(outputFileName, code, encoding);
