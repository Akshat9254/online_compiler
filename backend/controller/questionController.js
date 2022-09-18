const {
  generateCppCodeFile,
  generateInputFile,
  generateOutputFile,
} = require("../utils");
const { runCpp } = require("../service");

const fs = require("fs");

module.exports = {
  submit: async (req, res) => {
    const { input = "", code } = req.body;

    const inputFilePath = generateInputFile(input);
    const outputFilePath = generateOutputFile(inputFilePath);

    const codeFilePath = generateCppCodeFile(
      code,
      inputFilePath,
      outputFilePath
    );

    try {
      await runCpp(codeFilePath);

      const output = fs.readFileSync(outputFilePath, "utf-8");

      res.json({ output });
    } catch (err) {
      res.status(500).json({ err });
    }
  },
};
