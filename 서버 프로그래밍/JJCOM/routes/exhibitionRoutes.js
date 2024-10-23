const express = require("express");
const router = express.Router();
const {
   getAllExhibitions,
   createExhibition,
   getExhibition,
   updateExhibition,
   deleteExhibition,
   getExhibitionDetail, // 여기서 함수가 제대로 불러와져야 함
   upload
} = require("../controllers/exhibitionController");

// 전시 목록 및 전시 생성
router.route("/").get(getAllExhibitions).post(upload.single("poster"), createExhibition);

// 전시 상세 페이지
router.get("/:id/detail", getExhibitionDetail);

// 전시 삭제 및 업데이트 라우트 추가
router.route("/:id").get(getExhibition).put(updateExhibition).delete(deleteExhibition);

module.exports = router;
