const express = require("express");
const ShowController = require("../controllers/show");

const router = express.Router();

router
    .route("/")
    .get(ShowController.getShowController)
    .post(ShowController.createShowController)
    .patch(ShowController.updateShowController)
    .delete(ShowController.deleteShowController);

module.exports = router;