const express = require("express");
const dbConnect = require("./config/dbConnect");
const path = require("path");
const exhibitionRoutes = require("./routes/exhibitionRoutes");
const fs = require("fs");

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();

// 파일 저장 경로 확인 및 디렉토리 생성
const uploadDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 기본 경로 "/"에서 전시 목록 페이지로 리디렉트
app.get("/", (req, res) => {
    res.redirect("/exhibitions");
});

// 전시 등록 페이지로 이동하는 라우트 추가
app.get("/exhibition", (req, res) => {
    res.render("exhibition");
});

// exhibitions 라우트 연결
app.use("/exhibitions", exhibitionRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
