const express = require("express");
const router = express.Router();
const upload = require("../utils/fileUpload");
const { isAuthenticated, isSeller } = require("../middlewares/auth");
router.post("/create", isAuthenticated, isSeller, (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log("Coming from errrr", err);
      return res.status(500).send(err);
    }
    const { name, price } = req.body;
    if (!name || !price || !req.file) {
      return res.status(400).json({
        err: "We require all 3",
      });
    }

    if (Number.isNaN(price)) {
      return res.status(400).json({
        err: "Price should be a Number",
      });
    }

    let productDetails = {
      name,
      price,
      content: req.file.path,
    };

    return res.status(200).json({
      status: "ok",
      productDetails,
    });
  });
});
//multiple functions first isAuthenticated will reun if all ok then
//isSeller will ren and then tha last one.

module.exports = router;
