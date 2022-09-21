const { createClient } = require("redis");

const redisClient = createClient();

redisClient.on("error", (err) => console.log("Redis Client Error", err));

redisClient
  .connect()
  .then(() => console.log("redis connected!"))
  .catch((err) => console.log(err));

module.exports = { redisClient };
