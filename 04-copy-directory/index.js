const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;
const newFolder = path.join(__dirname, "files-copy");
const pathToFiles = path.join(__dirname, "files");

function copyDir() {
  fsPromises.mkdir(newFolder, { recursive: true });

  fs.readdir(pathToFiles, (err, files) => {
    if (err) {
      console.log(err);
    }
    files.forEach(function (file) {
      fsPromises.copyFile(
        path.join(__dirname, "files", file),
        path.join(__dirname, "files-copy", file)
      );
    });
    console.log("Папка создана");
  });

}
copyDir();


function lookAfter () {
  fs.readdir(newFolder, { withFileTypes: true }, (error, files) => {
      if (error) {
        console.log(error)
      };
      files.forEach((file) => {
        fs.readFile(path.join(__dirname, "files", file.name), (error) => {
          if (error) {
            fs.unlink(path.join(__dirname, 'files-copy', file.name), (error) => {
              if (error) {
                console.log (error)
              };
              console.log('файл удален');
            });
          }
        });
      });
    }
  );
}
lookAfter(); 