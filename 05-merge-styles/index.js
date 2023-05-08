const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;
const stylesFolder = path.join(__dirname, "styles");
const newStylesFolder = path.join(__dirname, "project-dist");

const writeText = fs.createWriteStream(path.join(newStylesFolder, 'bundle.css'));

const bundle = function () {
  fs.readdir(stylesFolder, (err, files) => {
    if (err) {
      console.log(err);
    }
    files.forEach(function (file) {
      const fileInfo = path.parse(file);
      const pathForFile = path.join(stylesFolder, file);

      fs.stat(pathForFile, (error, stats) => {
        if (error) {
          console.log(error);
        }
        const extension = fileInfo.ext;

        if (extension === ".css" && stats.isFile()) {
          fs.readFile(path.join(__dirname, "styles", file), 'utf-8', function(error,data){
            if (error) {
                console.log(error);
              }
            writeText.write(data);
          })
      } 
      });
    });
  });
};
bundle();
