const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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

   console.log('파일 정보:', req.file);

   res.render('index', { uploadedFile: req.file });
});

app.listen(port, () => {
   console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);

});