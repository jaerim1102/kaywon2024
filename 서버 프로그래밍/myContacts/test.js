const http = require("http");

const server = http.createServer((req, res) => {
    // console.log("request recived");
    console.log("요청 발생");
});

server.listen(3000, () => {
    // console.log("server started");
    console.log("서버 실행 중");
});