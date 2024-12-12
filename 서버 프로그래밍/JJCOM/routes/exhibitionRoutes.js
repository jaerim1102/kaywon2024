const express = require("express");
const router = express.Router();
const {
   getAllExhibitions,
   createExhibition,
   getExhibitionDetail,
   getExhibitionForEdit, // 수정 페이지로 이동
   updateExhibition,
   deleteExhibition,
   upload,
} = require("../controllers/exhibitionController");

const User = require("../models/User"); // 사용자 모델

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

// === 회원가입 및 로그인 라우트 추가 ===

// 회원가입 페이지
router.get("/auth/register", (req, res) => {
   res.render("register");
});

router.post("/auth/register", async (req, res) => {
   const { username, password } = req.body;

   try {
      // 중복된 username 확인
      const existingUser = await User.findOne({ username });
      if (existingUser) {
         return res.status(400).send("이미 사용 중인 사용자 이름입니다.");
      }

      // 새로운 사용자 저장
      const user = new User({ username, password });
      await user.save();
      res.redirect("/exhibitions/auth/login"); // 회원가입 후 로그인 페이지로 리디렉션
   } catch (error) {
      console.error(error);
      res.status(500).send("회원가입 중 오류가 발생했습니다.");
   }
});


// 로그인 페이지
router.get("/auth/login", (req, res) => {
   res.render("login");
});

// 로그인 처리
router.post("/auth/login", async (req, res) => {
   const { username, password } = req.body;

   try {
      const user = await User.findOne({ username });
      if (user && (await user.comparePassword(password))) {
         res.send("로그인 성공");
      } else {
         res.status(400).send("잘못된 사용자 이름 또는 비밀번호입니다.");
      }
   } catch (error) {
      console.error(error);
      res.status(500).send("로그인 중 오류가 발생했습니다.");
   }
});

module.exports = router;
