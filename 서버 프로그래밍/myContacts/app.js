const express = require("express");
const path = require("path");
const dbConnect = require("./config/dbConnect");
const Contact = require("./models/contactModel"); // Contact 모델 임포트
const app = express();
const port = 3000;

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// /contacts로 GET 요청이 왔을 때 contacts.html 반환
app.get("/contacts", (req, res) => {
    res.sendFile(path.join(__dirname, 'assets', 'contacts.html'));
});

// /api/contacts로 GET 요청이 왔을 때 모든 연락처 데이터를 JSON 형식으로 반환
app.get("/api/contacts", async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ message: error.message });
    }
});

// /contacts로 POST 요청이 왔을 때 여러 연락처를 생성하는 라우트 추가
app.post("/contacts", async (req, res) => {
    const contacts = req.body; // 요청 본문에서 배열 형태의 연락처 데이터 가져오기

    // POST된 연락처 정보를 터미널에 출력
    console.log("Received contacts:", JSON.stringify(contacts, null, 2));

    // 각 연락처에 대해 필수 필드 확인
    const invalidContacts = contacts.filter(contact => !contact.name || !contact.phone);
    if (invalidContacts.length > 0) {
        return res.status(400).json({ error: '모든 연락처는 이름과 전화번호가 필요합니다.' });
    }

    try {
        // 모든 연락처를 데이터베이스에 저장
        const savedContacts = await Contact.insertMany(contacts);
        res.status(201).json(savedContacts); // 성공적으로 생성된 연락처 반환
    } catch (error) {
        console.error("Error creating contacts:", error);
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`${port}번 포트에서 서버 실행 중`);
});
