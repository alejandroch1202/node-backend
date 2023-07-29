const express = require("express");
const response = require("./../network/response");
const store = require("./../store/mysql");

const router = express.Router();

router.get("/:table", async (req, res, next) => {
  try {
    const table = req.params.table;
    const result = await store.list(table);
    response.success(req, res, result, 200);
  } catch (error) {
    next(error);
  }
});

router.get("/:table/:id", async (req, res, next) => {
  try {
    const table = req.params.table;
    const id = req.params.id;
    const result = await store.get(table, id);
    response.success(req, res, result, 200);
  } catch (error) {
    next(error);
  }
});

router.post("/:table", async (req, res, next) => {
  try {
    const table = req.params.table;
    const data = req.body;
    const result = await store.add(table, data);
    response.success(req, res, result, 201);
  } catch (error) {
    next(error);
  }
});

router.patch("/:table/:id", async (req, res, next) => {
  try {
    const table = req.params.table;
    const id = req.params.id;
    const data = req.body;
    const result = await store.update(table, id, data);
    response.success(req, res, result, 200);
  } catch (error) {
    next(error);
  }
});

router.delete("/:table/:id", async (req, res, next) => {
  try {
    const table = req.params.table;
    const id = req.params.id;
    const result = await store.remove(table, id);
    response.success(req, res, result, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
