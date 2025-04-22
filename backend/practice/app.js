const express = require("express");

const route = require("./routes");

const app = express();

app.use("/place", route);

app.listen(4000);
