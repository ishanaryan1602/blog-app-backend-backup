const express = require("express");
const router = express.Router();
const userModel = require("../models/user");

router.get("/register", (req, res) => {
  console.log('succesfully routed to the register post page');
  return res.render("register");
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  await userModel.create({
    username,
    email,
    password,
  });
  console.log('succesfully registered user into database redirecting to the login page')
  return res.render("login"); 
});
 
router.get("/login", (req, res) => {
  console.log('succesfully routed to the login post page');
  return res.render("login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userToken = await userModel.matchPassword(email, password);
    if (userToken) {
      console.log(userToken);
      return res.cookie('userToken',userToken).redirect("/");
    }
  } catch (err) {
    console.log(err)
    return res.render("login", {
      // pageError: err.message
      pageError : 'Incorrect Email id or Password'
    });
  }
});


module.exports = router;
