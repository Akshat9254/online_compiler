const path = require("path");
const fs = require("fs");

const directoryPath = path.join(__dirname, "..", "codes", "cpp");

if (!fs.existsSync(directoryPath)) {
  fs.mkdirSync(directoryPath, { recursive: true });
}

const generateCppCodeFile = (code, inputFilePath, outputFilePath) => {
  const filename = path.basename(inputFilePath).split(".")[0] + ".cpp";
  const filePath = path.join(directoryPath, filename);

  const ioCode = `\nfreopen($input, "r", stdin);
    freopen($output, "w", stdout);`
    .replace("$input", `"${inputFilePath}"`)
    .replace("$output", `"${outputFilePath}"`);

  const index = code.indexOf("{", code.indexOf("int main()"));
  const finalCode = [
    code.slice(0, index + 1),
    ioCode,
    code.slice(index + 1),
  ].join("");

  fs.writeFileSync(filePath, finalCode);

  return filePath;
};

module.exports = generateCppCodeFile;
