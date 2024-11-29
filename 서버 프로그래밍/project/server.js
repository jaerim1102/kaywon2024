require('dotenv').config({ path: './path/to/.env' });
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Image = require('./models/images');
const dbConnect = require('./config/dbConnect'); // dbConnect 함수 가져오기

dbConnect(); // MongoDB 연결 함수 호출

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
   fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, uploadDir);
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
   }
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static(uploadDir));

app.get('/', (req, res) => {
   res.render('index');
});

app.post('/upload', upload.single('file'), (req, res) => {
   if (!req.file) {
      return res.status(400).send('파일이 업로드되지 않았습니다.');
   }

   // 클라이언트에서 받은 제목과 내용
   const { title, body } = req.body;

   if (!title || !body) {
      return res.status(400).send('제목과 내용은 필수 입력 사항입니다.');
   }

   console.log('파일 정보:', req.file);
   console.log('제목:', title);
   console.log('내용:', body);

   // MongoDB에 이미지 정보 저장
   const newImage = new Image({
      title: title, // 클라이언트에서 받은 제목
      body: body, // 클라이언트에서 받은 내용
      filename: req.file.filename, // 업로드된 파일의 이름
      path: path.join('uploads', req.file.filename), // 파일 경로
      size: req.file.size // 파일 크기
   });

   newImage.save()
      .then(() => {
         console.log('이미지 정보가 MongoDB에 저장되었습니다.');
         // EJS에 파일과 제목, 내용을 모두 전달
         res.render('index', { uploadedFile: { title, body, filename: req.file.filename, path: req.file.path } });
      })
      .catch((err) => {
         console.error('이미지 저장 오류:', err);
         res.status(500).send('이미지 저장 중 오류가 발생했습니다.');
      });
});

app.listen(port, () => {
   console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
