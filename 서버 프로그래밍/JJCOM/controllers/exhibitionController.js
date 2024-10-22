const asyncHandler = require("express-async-handler");
const Exhibition = require("../models/exhibitionModel");

// @desc Get all exhibitions
// @route GET /exhibitions
const getAllExhibitions = asyncHandler(async (req, res) => {
   const exhibitions = await Exhibition.find();
   res.render("exhibitions", { exhibitions });
});

// @desc Create a new exhibition
// @route POST /exhibitions
const createExhibition = asyncHandler(async (req, res) => {
   const {
      school, major, exhibition_name, exhibition_location,
      start_date, end_date, exhibition_time, description,
      online_link, sns_link
   } = req.body;

   if (!school || !major || !exhibition_name || !exhibition_location || !start_date || !end_date || !exhibition_time || !description) {
      res.status(400).send("모든 필수 정보를 입력해주세요.");
      return;
   }

   const exhibition = await Exhibition.create({
      school, major, exhibition_name, exhibition_location,
      start_date, end_date, exhibition_time, description,
      online_link, sns_link
   });

   res.status(201).send("전시가 성공적으로 등록되었습니다.");
});

// @desc Get an exhibition by ID
// @route GET /exhibitions/:id
const getExhibition = asyncHandler(async (req, res) => {
   const exhibition = await Exhibition.findById(req.params.id);
   if (!exhibition) {
      return res.status(404).json({ message: "전시를 찾을 수 없습니다." });
   }
   res.status(200).json(exhibition);
});

// @desc Update an exhibition
// @route PUT /exhibitions/:id
const updateExhibition = asyncHandler(async (req, res) => {
   const exhibition = await Exhibition.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
   );

   if (!exhibition) {
      return res.status(404).json({ message: "전시를 찾을 수 없습니다." });
   }

   res.status(200).json(exhibition);
});

// @desc Delete an exhibition
// @route DELETE /exhibitions/:id
const deleteExhibition = asyncHandler(async (req, res) => {
   const exhibition = await Exhibition.findByIdAndDelete(req.params.id);

   if (!exhibition) {
      return res.status(404).json({ message: "전시를 찾을 수 없습니다." });
   }

   res.status(200).send(`전시가 삭제되었습니다: ${req.params.id}`);
});

module.exports = {
   getAllExhibitions,
   createExhibition,
   getExhibition,
   updateExhibition,
   deleteExhibition
};
