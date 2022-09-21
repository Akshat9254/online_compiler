const {
  generateInputFile,
  generateOutputFile,
  generateCppCodeFile,
  generateJavaCodeFile,
  generateDirectory,
} = require("../utils");
const runCpp = require("./runCpp");
const runJava = require("./runJava");
const fs = require("fs");

const { redisClient } = require("../config/redis");

const Queue = require("bull");
const path = require("path");

const queue = new Queue("online_compiler");
const NUM_WORKERS = 10;

const addJobToQueue = async (submissionId, code, input, ext) => {
  try {
    await queue.add({ submissionId, code, input, ext });
  } catch (err) {
    console.log("error in addJobToQueue", err);
    throw Error(err);
  }
};

queue.process(NUM_WORKERS, async ({ data }) => {
  const { submissionId, code, input, ext } = data;

  const directoryPath = generateDirectory(submissionId);
  const inputFilePath = generateInputFile(input, directoryPath);
  const outputFilePath = generateOutputFile(directoryPath);
  let codeFilePath;

  switch (ext) {
    case "cpp":
      codeFilePath = generateCppCodeFile(
        code,
        inputFilePath,
        outputFilePath,
        directoryPath
      );

      try {
        await runCpp(codeFilePath, directoryPath);
        const output = fs.readFileSync(outputFilePath, "utf-8");
        return {
          output,
          directoryPath,
        };
      } catch (err) {
        console.log("error in queue.process", err);
        return {
          output: err.stderr,
          directoryPath,
        };
      }
      break;
    case "java":
      codeFilePath = generateJavaCodeFile(
        code,
        inputFilePath,
        outputFilePath,
        directoryPath
      );

      try {
        await runJava(codeFilePath, directoryPath);
        const output = fs.readFileSync(outputFilePath, "utf-8");
        return {
          output,
          directoryPath,
        };
      } catch (err) {
        console.log("error in queue.process", err);
        return {
          output: err.stderr,
          directoryPath,
        };
      }
      break;
  }
});

queue.on("completed", async ({ data }, { output, directoryPath }) => {
  try {
    await redisClient.set(data.submissionId, output);
    fs.rmSync(directoryPath, { recursive: true, force: true });
  } catch (err) {
    console.log("error in queue.completed", err);
    throw Error(err);
  }
});

module.exports = { addJobToQueue };
