const { exec } = require("child_process");
const path = require("path");
// const fs = require("fs");

const outputDirectory = path.join(__dirname, "..", "codes", "cpp");
// if (!fs.existsSync(outputDirectory)) {
//   fs.mkdirSync(outputDirectory, { recursive: true });
// }

const runCpp = (filePath) => {
  const outputFilename = path.basename(filePath).split(".")[0];
  // const outputFilePath = path.join(outputDirectory, `${outputFilename}.out`);
  const outputFilePath = path.join(outputDirectory, `${outputFilename}.out`);
  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filePath} -o ${outputFilePath} && cd ${outputDirectory} && ./${outputFilename}.out`,
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject({ stderr });
        resolve(stdout);
      }
    );
  });
};

module.exports = runCpp;
