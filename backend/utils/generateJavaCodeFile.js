const path = require("path");
const fs = require("fs");

const generateCppCodeFile = (
  code,
  inputFilePath,
  outputFilePath,
  directoryPath
) => {
  const filename = "Main.java";
  const filePath = path.join(directoryPath, filename);

  const ioCode = `\nSystem.setIn(new FileInputStream(new File($input)));
        System.setOut(new PrintStream(new File($output)));`
    .replace("$input", `"${inputFilePath}"`)
    .replace("$output", `"${outputFilePath}"`);

  const index = code.indexOf("{", code.indexOf("main"));
  const finalCode = [
    code.slice(0, index + 1),
    ioCode,
    code.slice(index + 1),
  ].join("");

  fs.writeFileSync(filePath, finalCode);

  return filePath;
};

module.exports = generateCppCodeFile;
