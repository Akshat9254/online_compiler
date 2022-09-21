const path = require("path");
const fs = require("fs");

const generateOutputFile = (directoryPath) => {
  const filename = "output.txt";
  const filePath = path.join(directoryPath, filename);

  fs.writeFileSync(filePath, "");

  return filePath;
};

module.exports = generateOutputFile;
