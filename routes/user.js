const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  validateName,
  validateEmail,
  validatePassword,
} = require("../utils/validators");
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, isSeller } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(403).json({ err: "User already exixts" });
    }
    if (!validateName(name)) {
      return res.status(400).json({ err: "Please Enter Valid Name" });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ err: "Please Enter Valid Email" });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ err: "Please Enter Valid Password" });
    }

    const hashedPassword = await bcrypt.hash(password, (saltOrRounds = 10));
    const user = {
      email,
      name,
      isSeller,
      password: hashedPassword,
    };

    const createdUser = await User.create(user);
    return res.status(201).json({
      message: `Welcome ${createdUser.name}`,
    });
  } catch (e) {
    console.log(">>>", e);
    return res.status(500).send(e);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email.length == 0) {
      return res.status(400).json({
        err: "Please provide email",
      });
    }
    if (password.length == 0) {
      return res.status(400).json({
        err: "Please provide password",
      });
    }
    const existinguser = await User.findOne({ where: { email } });
    if (!existinguser) {
      return res.status(404).json({
        err: "User not found",
      });
    }

    const passwordMatch = await bcrypt.compare(password, existinguser.password);
    if (!passwordMatch) {
      return res.status(404).json({
        err: "Email or Password Mismatched",
      });
    }
    const payload = { user: { id: existinguser.id } };
    const bearerToken = jwt.sign(payload, "SECRET MESSAGE", {
      expiresIn: 360000,
    });
    res.cookie("t", bearerToken, { expire: new Date() + 9999 });
    return res.status(200).json({
      bearerToken,
    });
  } catch (e) {
    console.log(">>>>", e);
    return res.status(500).send(e);
  }
});

router.get("/signout", (req, res) => {
  try {
    res.clearCookie("t");
    return res.status(200).json({
      message: "Cookie Deleted",
    });
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports = router;
