require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = 3000;

// MongoDB 연결 설정
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB 연결 성공'))
    .catch((err) => console.error('MongoDB 연결 실패:', err));

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // 정적 파일 경로

// 세션 미들웨어 설정
app.use(session({
    secret: 'treasure', // 보안을 위해 강력한 키로 변경
    resave: false,
    saveUninitialized: false,
}));

// 세션 데이터를 템플릿에서 사용할 수 있도록 설정
app.use((req, res, next) => {
    res.locals.session = req.session; // 세션 데이터를 모든 템플릿에서 사용 가능
    next();
});

// 요청 로깅 미들웨어
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - Session:`, req.session);
    next();
});

// 뷰 엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 라우트 설정
const exhibitionRoutes = require('./routes/exhibitionRoutes');
app.use('/exhibitions', exhibitionRoutes);

// 기본 경로로 전시 목록 페이지 리디렉션
app.get('/', (req, res) => {
    res.redirect('/exhibitions');
});

// 404 에러 핸들링
app.use((req, res) => {
    res.status(404).send('페이지를 찾을 수 없습니다.');
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
