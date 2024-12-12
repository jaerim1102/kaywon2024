const Exhibition = require("../models/exhibitionModel");
const multer = require("multer");
const path = require("path");

// Multer 설정
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, "./public/uploads/");
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
   },
});
const upload = multer({ storage: storage });

// 전시 목록 가져오기
const getAllExhibitions = async (req, res) => {
   try {
      const exhibitions = await Exhibition.find();
      res.render("exhibitions", { exhibitions });
   } catch (error) {
      console.error("전시 목록 오류:", error);
      res.status(500).send("전시 목록을 불러오는 중 오류가 발생했습니다.");
   }
};

// 전시 등록
const createExhibition = async (req, res) => {
   try {
      const { exhibition_name, school, major, description, exhibition_location, start_date, end_date, exhibition_time, online_link, sns_link } = req.body;

      const newExhibition = new Exhibition({
         exhibition_name,
         school,
         major,
         description,
         exhibition_location,
         start_date,
         end_date,
         exhibition_time,
         online_link,
         sns_link,
         poster: req.file ? `/uploads/${req.file.filename}` : null,
         createdBy: req.session.user.username,
      });

      await newExhibition.save();
      res.redirect("/exhibitions");
   } catch (error) {
      console.error("전시 등록 오류:", error);
      res.status(500).send("전시 등록 중 오류가 발생했습니다.");
   }
};

// 전시 상세 정보 가져오기
const getExhibitionDetail = async (req, res) => {
   try {
      const exhibition = await Exhibition.findById(req.params.id);
      if (!exhibition) {
         return res.status(404).send("전시를 찾을 수 없습니다.");
      }
      res.render("exhibitionDetail", { exhibition });
   } catch (error) {
      console.error("전시 상세 오류:", error);
      res.status(500).send("전시 상세 정보를 불러오는 중 오류가 발생했습니다.");
   }
};

// 수정 페이지로 이동
const getExhibitionForEdit = async (req, res) => {
   try {
      const exhibition = await Exhibition.findById(req.params.id);
      if (!exhibition) {
         return res.status(404).send("전시를 찾을 수 없습니다.");
      }
      res.render("editExhibition", { exhibition });
   } catch (error) {
      console.error("수정 페이지 오류:", error);
      res.status(500).send("수정 페이지를 불러오는 중 오류가 발생했습니다.");
   }
};

// 전시 수정
const updateExhibition = async (req, res) => {
   try {
      const exhibition = await Exhibition.findById(req.params.id);
      if (!exhibition) {
         return res.status(404).send("전시를 찾을 수 없습니다.");
      }

      const isOwner = exhibition.createdBy === req.session.user.username;
      const isAdmin = req.session.user.username === "test";

      if (!isOwner && !isAdmin) {
         return res.status(403).send("수정 권한이 없습니다.");
      }

      const updates = req.body;
      if (req.file) {
         updates.poster = `/uploads/${req.file.filename}`;
      }

      await Exhibition.findByIdAndUpdate(req.params.id, updates);
      res.redirect("/exhibitions");
   } catch (error) {
      console.error("전시 수정 오류:", error);
      res.status(500).send("전시 수정 중 오류가 발생했습니다.");
   }
};

const deleteExhibition = async (req, res) => {
   try {
      const exhibition = await Exhibition.findById(req.params.id);
      if (!exhibition) {
         return res.status(404).json({ error: "전시를 찾을 수 없습니다." });
      }

      const isOwner = exhibition.createdBy === req.session.user.username;
      const isAdmin = req.session.user.username === "test";

      if (!isOwner && !isAdmin) {
         return res.status(403).json({ error: "삭제 권한이 없습니다." });
      }

      await Exhibition.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "삭제 성공" }); // 명확한 성공 응답
   } catch (error) {
      console.error("전시 삭제 오류:", error);
      res.status(500).json({ error: "전시 삭제 중..." });
   }
};


module.exports = {
   getAllExhibitions,
   createExhibition,
   getExhibitionDetail,
   getExhibitionForEdit,
   updateExhibition,
   deleteExhibition,
   upload,
};
