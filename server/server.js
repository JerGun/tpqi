require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const product = require("./routes/product.routes");

const app = express();

mongoose.Promise = global.Promise;

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("[Success] : Connected to the database!");
    },
    (error) => {
      console.log("[Failed] : Can't connect to the database!", error);
      process.exit();
    }
  );

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get("/", (req, res) => {
  res.send("### Server Started! ###");
});

app.use("/", product);

const PORT = process.env.PORT || 9000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
