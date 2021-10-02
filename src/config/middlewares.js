const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const BullBoard = require("bull-board");
const Queue = require("../services/Queue");

BullBoard.setQueues(Queue.queues.map((queue) => queue.bull));

module.exports = (app) => {
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use(morgan("dev"));
  app.use("/admin/queues", BullBoard.UI);
};
