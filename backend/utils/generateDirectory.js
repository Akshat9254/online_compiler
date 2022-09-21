const path = require("path");
const fs = require("fs");

const generateDirectory = (submissionId) => {
  const directoryPath = path.join(__dirname, "..", "codes", submissionId);

  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  return directoryPath;
};

module.exports = generateDirectory;
