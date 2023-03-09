const express = require("express");
const app = express();
const cors = require("cors");

require("./Model/connection.js")
const bodyParser = require("body-parser");
const userRoute = require("./Router/userRouter.js");
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((err, req, res, next) => {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

app.use("/api", userRoute);


app.listen(port, () => {
  console.log(`server is running on port number..${port}`);
});
