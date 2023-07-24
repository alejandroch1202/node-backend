const express = require("express");
const security = require("./security");
const response = require("./../../../network/response");
const controller = require("./index");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await controller.list();    
    response.success(req, res, result, 200);
  } catch (error) {
    response.error(req, res, "Internal error", 500, error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await controller.get(id);    
    response.success(req, res, result, 200);
  } catch (error) {
    response.error(req, res, "Internal error", 500, error);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const result = await controller.add(data);    
    response.success(req, res, result, 201);
  } catch (error) {
    response.error(req, res, "Internal error", 500, error);
  }
});

router.patch("/:id", security("update"), async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await controller.update(id, data);
    response.success(req, res, result, 200);
  } catch (error) {
    response.error(req, res, "Internal error", 500, error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await controller.remove(id);    
    response.success(req, res, result, 200);
  } catch (error) {
    response.error(req, res, "Internal error", 500, error);
  }
});

module.exports = router;
