const express = require("express");
const router = express.Router();
const {
   getAllExhibitions,
   createExhibition,
   getExhibition,
   updateExhibition,
   deleteExhibition
} = require("../controllers/exhibitionController");

router.route("/").get(getAllExhibitions).post(createExhibition);
router.route("/:id").get(getExhibition).put(updateExhibition).delete(deleteExhibition);

module.exports = router;
