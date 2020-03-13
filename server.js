if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const bodyParser = require("body-parser");

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./routes/index");
const auhtorRouter = require("./routes/authors");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.set(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to mongoose"));

app.use("/", indexRouter);
app.use("/authors", auhtorRouter);

app.listen(process.env.PORT || 3000, () =>
  console.log(`server started on port 3000`)
);
