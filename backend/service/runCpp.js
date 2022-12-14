const { exec } = require("child_process");
const path = require("path");

const runCpp = (filePath, directoryPath) => {
  const outputFilePath = path.join(directoryPath, `code.out`);
  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filePath} -o ${outputFilePath} && cd ${directoryPath} && ./code.out`,
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject({ stderr });
        resolve(stdout);
      }
    );
  });
};

module.exports = runCpp;
