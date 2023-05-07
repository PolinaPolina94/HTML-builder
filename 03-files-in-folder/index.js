const fs = require('fs');
const path = require('path');
const pathToFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathToFolder, (err, files) => { 
    if (err) {
        console.log(err)
    }
    files.forEach(function(file){

    const fileInfo = path.parse(file);
    const pathForFile = path.join(pathToFolder, file); 

      fs.stat(pathForFile, (error, stats) => {
        if (error) {
          console.log(error);
        }
        if (stats.isFile()){
            const name = fileInfo.name;
            const extension = fileInfo.ext;
            const weight = stats.size
        console.log(name + ' ' + '-' + extension.replace('.', ' ') + ' ' + '-' + ' ' + weight/1000 + 'kb')
        }
      });
     }
    ) 
});