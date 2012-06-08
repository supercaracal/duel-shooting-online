var fs = require('fs')
  , path = require('path')
  , outputFileName = 'duel.cat.js'
  , encoding = 'utf8'
  , filePaths = []
  , code = '';

(function(dir) {
    if (!path.existsSync(dir)) {
        console.log(dir + ' does not exist.');
        return;
    }
    var lambda = arguments.callee;
    fs.readdirSync(dir).forEach(function(fileOrDir) {
        if (fileOrDir == path.basename(__filename)) {
            return;
        }
        var relativePath = dir + '/' + fileOrDir;
        if (fileOrDir == outputFileName) {
            fs.unlinkSync(relativePath);
            return;
        }
        if (fs.statSync(relativePath).isDirectory()) {
            lambda(relativePath);
            return;
        }
        filePaths.push(relativePath);
    });
}(__dirname));

filePaths.sort(function(a, b) {
    if (a.indexOf('/base/') !== -1 && b.indexOf('/base/') === -1) return -1;
    if (a.indexOf('/base/') === -1 && b.indexOf('/base/') !== -1) return 1;
    a = path.basename(a).replace(/(-)|(\.js)/g, '');
    b = path.basename(b).replace(/(-)|(\.js)/g, '');
    return a < b ? -1 : 1;
});

filePaths.forEach(function(filePath) {
    code += fs.readFileSync(filePath, encoding);
    code += "\n/************************************/\n";
    console.log(path.normalize(filePath));
});

fs.writeFileSync(outputFileName, code, encoding);
