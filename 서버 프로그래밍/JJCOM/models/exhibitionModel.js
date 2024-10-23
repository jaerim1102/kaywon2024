const mongoose = require("mongoose");

const exhibitionSchema = new mongoose.Schema({
   school: { type: String, required: true },
   major: { type: String, required: true },
   exhibition_name: { type: String, required: true },
   exhibition_location: { type: String, required: true },
   start_date: { type: Date, required: true },
   end_date: { type: Date, required: true },
   exhibition_time: { type: String, required: true },
   description: { type: String, required: true },
   poster: { type: String }, // 포스터 경로 필드
   online_link: { type: String },
   sns_link: { type: String }
});

const Exhibition = mongoose.model("Exhibition", exhibitionSchema);

module.exports = Exhibition;
