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
