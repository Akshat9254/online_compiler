const { exec } = require("child_process");
const path = require("path");

const runJava = (filePath, directoryPath) => {
  //   const outputFilePath = path.join(directoryPath, `code.out`);
  return new Promise((resolve, reject) => {
    exec(
      `javac ${filePath} && cd ${directoryPath} && java Main`,
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject({ stderr });
        resolve(stdout);
      }
    );
  });
};

module.exports = runJava;
