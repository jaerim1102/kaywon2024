const Exhibition = require("../models/exhibitionModel");

// 전시 목록 가져오기
const getAllExhibitions = async (req, res) => {
   try {
      const exhibitions = await Exhibition.find();
      res.render("exhibitions", { exhibitions });
   } catch (error) {
      res.status(500).send("서버 오류가 발생했습니다.");
   }
};

// 전시 상세 정보 함수
const getExhibitionDetail = async (req, res) => {
   try {
      const exhibition = await Exhibition.findById(req.params.id);
      if (!exhibition) {
         return res.status(404).send("전시를 찾을 수 없습니다.");
      }
      res.render("exhibitionDetail", { exhibition });
   } catch (error) {
      res.status(500).send("서버 오류가 발생했습니다.");
   }
};

// 전시 정보 가져오기 (수정할 때 사용)
const getExhibition = async (req, res) => {
   try {
      const exhibition = await Exhibition.findById(req.params.id);
      if (!exhibition) {
         return res.status(404).send("전시를 찾을 수 없습니다.");
      }
      res.status(200).json(exhibition);
   } catch (error) {
      res.status(500).send("서버 오류가 발생했습니다.");
   }
};

// 전시 생성 함수
const createExhibition = async (req, res) => {
   try {
      const newExhibition = new Exhibition({
         school: req.body.school,
         major: req.body.major,
         exhibition_name: req.body.exhibition_name,
         exhibition_location: req.body.exhibition_location,
         start_date: req.body.start_date,
         end_date: req.body.end_date,
         exhibition_time: req.body.exhibition_time,
         description: req.body.description,
         poster: req.file ? "/uploads/" + req.file.filename : null
      });

      await newExhibition.save();
      res.redirect("/exhibitions");
   } catch (error) {
      res.status(400).send("전시 등록에 실패했습니다.");
   }
};

// 전시 삭제 함수
const deleteExhibition = async (req, res) => {
   try {
      const exhibition = await Exhibition.findByIdAndDelete(req.params.id);
      if (!exhibition) {
         return res.status(404).send("전시를 찾을 수 없습니다.");
      }
      res.status(200).json({ message: "전시가 삭제되었습니다." });
   } catch (error) {
      res.status(500).send("서버 오류가 발생했습니다.");
   }
};

// 전시 수정 함수
const updateExhibition = async (req, res) => {
   try {
      const exhibition = await Exhibition.findByIdAndUpdate(
         req.params.id,
         req.body,
         { new: true }
      );
      res.status(200).json(exhibition);
   } catch (error) {
      res.status(500).send("전시 수정에 실패했습니다.");
   }
};

// multer 설정
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, "./public/uploads/");
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
   }
});
const upload = multer({ storage: storage });

module.exports = {
   getAllExhibitions,
   createExhibition,
   getExhibition,
   updateExhibition,
   deleteExhibition,
   getExhibitionDetail,
   upload
};
