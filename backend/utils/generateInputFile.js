const path = require("path");
const fs = require("fs");

const generateInputFile = (input, directoryPath) => {
  const filename = "input.txt";
  const filePath = path.join(directoryPath, filename);

  fs.writeFileSync(filePath, input);

  return filePath;
};

module.exports = generateInputFile;
