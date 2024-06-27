const express = require("express");
const dbConnect = require("./connection");
const path = require("path");
const userRoutes = require("./routes/user");
const cookieParser = require("cookie-parser");
const checkCookie = require("./middlewares/cookieChecker");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkCookie("userToken"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  console.log("this is the req.user ", req.user);
  res.render("homepage", {
    user: req.user,
  });
});

app.use("/users", userRoutes);

app.use("/", (req, res, next) => {
  res.render("err");
});

app.listen(port, () => console.log("listening on port", port));
