const express = require("express");
const router = express.Router();
const {
   getAllExhibitions,
   createExhibition,
   getExhibitionDetail,
   getExhibitionForEdit,
   updateExhibition,
   deleteExhibition,
   upload,
} = require("../controllers/exhibitionController");
const { ensureAuthenticated } = require("../middlewares/auth");
const User = require("../models/User"); // User 모델 추가

// === 전시 관련 라우트 ===

// 전시 목록
router.get("/", getAllExhibitions);

// 전시 등록 (로그인 필요)
router.get("/register", ensureAuthenticated, (req, res) => {
   res.render("exhibitionRegister", { title: "전시 등록" });
});
router.post("/", ensureAuthenticated, upload.single("poster"), createExhibition);

// 전시 상세 (누구나 접근 가능)
router.get("/:id/detail", getExhibitionDetail);

// 전시 수정 (로그인 필요)
router.get("/:id/edit", ensureAuthenticated, getExhibitionForEdit);
router.post("/:id", ensureAuthenticated, upload.single("poster"), updateExhibition);

// 전시 삭제 (로그인 필요)
router.delete("/:id", ensureAuthenticated, deleteExhibition);

// === 마이페이지 ===
// 현재 사용자가 등록한 전시 보기
router.get("/mypage", ensureAuthenticated, async (req, res) => {
   try {
      const exhibitions = await Exhibition.find({ createdBy: req.session.user.username });
      res.render("mypage", { title: "내 전시 목록", exhibitions });
   } catch (error) {
      console.error("마이페이지 오류:", error);
      res.status(500).send("마이페이지를 불러오는 중 오류가 발생했습니다.");
   }
});

// === 인증 관련 라우트 ===

// 로그인 페이지
router.get("/auth/login", (req, res) => {
   res.render("login", { title: "로그인" });
});

// 로그인 처리
router.post("/auth/login", async (req, res) => {
   const { username, password } = req.body;
   try {
      const user = await User.findOne({ username });
      if (user && (await user.comparePassword(password))) {
         req.session.user = { username }; // 세션에 사용자 정보 저장
         res.redirect("/exhibitions");
      } else {
         res.status(400).send("잘못된 사용자 이름 또는 비밀번호입니다.");
      }
   } catch (error) {
      console.error("로그인 오류:", error);
      res.status(500).send("로그인 중 오류가 발생했습니다.");
   }
});

// 회원가입 페이지
router.get("/auth/register", (req, res) => {
   res.render("register", { title: "회원가입" });
});

// 회원가입 처리
router.post("/auth/register", async (req, res) => {
   const { username, password } = req.body;
   try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
         return res.status(400).send("이미 사용 중인 사용자 이름입니다.");
      }
      const user = new User({ username, password });
      await user.save();
      res.redirect("/exhibitions/auth/login");
   } catch (error) {
      console.error("회원가입 오류:", error);
      res.status(500).send("회원가입 중 오류가 발생했습니다.");
   }
});

// 로그아웃
router.get("/auth/logout", (req, res) => {
   req.session.destroy(() => {
      res.redirect("/exhibitions/auth/login");
   });
});

module.exports = router;
