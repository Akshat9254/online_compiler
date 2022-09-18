const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const directoryPath = path.join(__dirname, "..", "input", "cpp");

if (!fs.existsSync(directoryPath)) {
  fs.mkdirSync(directoryPath, { recursive: true });
}

const generateInputFile = (input) => {
  const filename = uuid() + ".txt";
  const filePath = path.join(directoryPath, filename);

  fs.writeFileSync(filePath, input);

  return filePath;
};

module.exports = generateInputFile;
