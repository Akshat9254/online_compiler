const path = require("path");
const fs = require("fs");

const directoryPath = path.join(__dirname, "..", "output", "cpp");

if (!fs.existsSync(directoryPath)) {
  fs.mkdirSync(directoryPath, { recursive: true });
}

const generateOutputFile = (inputFilePath) => {
  const filename = path.basename(inputFilePath).split(".")[0] + ".txt";
  const filePath = path.join(directoryPath, filename);

  fs.writeFileSync(filePath, "");

  return filePath;
};

module.exports = generateOutputFile;
