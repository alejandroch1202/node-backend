const express = require("express");
const response = require("./../../../network/response");
const controller = require("./index");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await controller.list();    
    response.success(req, res, result, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
