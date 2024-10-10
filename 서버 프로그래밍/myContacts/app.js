const express = require("express");
const app = express();
const path = require("path");
const port = 3000;



// MongoDB 연결
const { MongoClient } = require('mongodb');

let db;
const url = 'mongodb+srv://toosign:437377@main.vrmnq.mongodb.net/';
new MongoClient(url).connect().then((client) => {
   console.log('DB연결성공');
   db = client.db('myContacts');

   // 서버 실행
   app.listen(port, () => {
      console.log(`${port}번 포트에서 서버 실행 중`);
   });

}).catch((err) => {
   console.log(err);
});

app.get("/", () => {
   db.collection('contact').insertOne({
      name: '김재림',
      phone: '010-1234-5678'
   });
   console.log('데이터 추가 완료');
});

const requestTime = (req, res, next) => {
   let today = new Date();
   let now = today.toLocaleTimeString();
   req.requestTime = now;
   next();
};

app.use(requestTime);