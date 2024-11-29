const mongoose = require('mongoose');

// 스키마 정의
const imageSchema = new mongoose.Schema({
   // 게시물 제목
   title: {
      type: String,
      required: true,
   },
   // 게시물 내용
   body: {
      type: String,
      required: true,
   },

   // 게시물 작성일
   createdAt: {
      type: Date,
      default: Date.now(),
   },
});

// 모듈 내보내기
module.exports = mongoose.model('Image', imageSchema);