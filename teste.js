const aaa = require('./index.js');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

(async ()=>{
    await aaa.init('sa-east-1', 'AKIAVO6RIPJ3MVZ74QJC', 'upo1j3mJOrdGg+SovLNdhqcKuO+Jwavv/qJdr867')
    // await aaa.createBucket('meubucketdeteste2', 'sa-east-1');

    var newFileName = 'file' + new Date().getMilliseconds() + '.txt'
    var filePath = path.join(__dirname, 'arquivos', newFileName)
    var writeFile = promisify(fs.writeFile)
    var unlink = promisify(fs.unlink)
    var readDir = promisify(fs.readdir)

    var files = await readDir(path.join(__dirname, 'arquivos'))

    files.forEach(file => {
        unlink(path.join(__dirname, 'arquivos', file))
    })

    await writeFile(filePath, `File created in ${new Date().toLocaleString('pt-BR')}`);

    var fileContent = fs.readFileSync(filePath);

    try {
        var newObject = await aaa.uploadObject('meubucketdeteste2', 'pasta1/' + newFileName, fileContent);
        console.log('>>>>>>>', newObject);
        
    } catch (error) {
        console.log(error);
    }

})();
