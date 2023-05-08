const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;

const pathToNewprojectDistFolder = path.join(__dirname, "project-dist");
const pathToStylesFolder = path.join(__dirname, "styles");
const pathToAssetsFolder = path.join(__dirname, "assets");
const pathToNewAssetsFolder = path.join(pathToNewprojectDistFolder, "assets");
const templateFile = path.join(__dirname, "template.html");
const componentsFile = path.join(__dirname, "components");

const writeText = fs.createWriteStream(
  path.join(pathToNewprojectDistFolder, "style.css")
);

const createDir = function () {
  fsPromises.mkdir(pathToNewprojectDistFolder, { recursive: true });
  const bundle = function () {
    fs.readdir(pathToStylesFolder, (err, files) => {
      if (err) {
        console.log(err);
      }
      files.forEach(function (file) {
        const fileInfo = path.parse(file);
        const pathForFile = path.join(pathToStylesFolder, file);

        fs.stat(pathForFile, (error, stats) => {
          if (error) {
            console.log(error);
          }
          const extension = fileInfo.ext;

          if (extension === ".css" && stats.isFile()) {
            fs.readFile(
              path.join(__dirname, "styles", file),
              "utf-8",
              function (error, data) {
                if (error) {
                  console.log(error);
                }
                writeText.write(data);
              }
            );
          }
        });
      });
    });
  };
  bundle();

// make with await 

  async function buildComponents(template, dist) {
    let tempHTML = await fs.promises.readFile(template, "utf-8");
    const matches = tempHTML.matchAll(/{{(.*?)}}/g);
    for (let match of matches) {
      const nameOfComponent = match[1];
      let fileOfComponent = path.join(componentsFile, `${nameOfComponent}.html`);
      const componentHTML = await fs.promises.readFile(fileOfComponent, "utf8");
      tempHTML = tempHTML.replace(match[0], componentHTML);
    }
    await fs.promises.writeFile(
      path.join(dist, "index.html"),
      tempHTML,
      "utf-8"
    );
  }

  buildComponents(templateFile, pathToNewprojectDistFolder);

  function copyDir(folder, newFolder) {
    fs.mkdir(newFolder, { recursive: true }, (err) => {
      if (err) throw err;
    });
    fs.readdir(folder, { withFileTypes: true }, (err, files) => {
      if (err) {
        throw err;
      }
      files.forEach((file) => {
        if (file.isFile()) {
          const assetsFile = path.join(folder, file.name);
          const assetsDistFlle = path.join(newFolder, file.name);
          fs.promises.copyFile(assetsFile, assetsDistFlle);
        } else {
          copyDir(
            path.join(folder, file.name),
            path.join(newFolder, file.name)
          );
        }
      });
    });
  }

  copyDir(pathToAssetsFolder, pathToNewAssetsFolder);
};

createDir();
