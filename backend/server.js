const express = require("express");
const cors = require("cors");

const { questionRouter } = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/question", questionRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server listening at ${PORT}`));
