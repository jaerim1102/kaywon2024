// HTTP 모듈로 서버 만들고 실행하기 (결과 비교 파일 : 04\results\server-1.js)

const http = require("http");

const server = http.createServer((req,
   res) => {
   console.log("요청 발생");
});

server.listen(3000, () => {
   console.log("3000번 포트에서 서버 실행 중");

});