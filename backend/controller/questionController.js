const { v4: uuid } = require("uuid");
const { addJobToQueue } = require("../service/queueService");
const { redisClient } = require("../config/redis");

module.exports = {
  submit: async (req, res) => {
    try {
      const { input = "", code, ext = "java" } = req.body;
      const submissionId = uuid();

      await addJobToQueue(submissionId, code, input, ext);
      res.json({ submissionId });
    } catch (err) {
      console.error(err);
    }
  },

  status: async (req, res) => {
    const { id: submissionId } = req.params;
    if (!submissionId)
      res.status(400).json({ message: "submissionId not found" });
    try {
      const result = await redisClient.get(submissionId);

      if (result) {
        redisClient.del(submissionId);
        res.json({ status: "completed", result });
      } else {
        res.json({ status: "pending" });
      }
    } catch (err) {
      console.error(err);
    }
  },
};
