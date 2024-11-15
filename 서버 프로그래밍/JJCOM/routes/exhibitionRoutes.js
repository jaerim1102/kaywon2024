const express = require("express");
const router = express.Router();
const {
   getAllExhibitions,
   createExhibition,
   getExhibitionDetail,
   getExhibitionForEdit, // 수정 페이지로 이동
   updateExhibition,
   deleteExhibition,
   upload
} = require("../controllers/exhibitionController");

// 전시 목록 및 전시 생성
router.route("/").get(getAllExhibitions).post(upload.single("poster"), createExhibition);

// 전시 상세 페이지
router.get("/:id/detail", getExhibitionDetail);

// 수정 페이지로 이동
router.get("/:id/edit", getExhibitionForEdit);

// 전시 수정
router.post("/:id", upload.single("poster"), updateExhibition);

// 전시 삭제
router.delete("/:id", deleteExhibition);

module.exports = router;
