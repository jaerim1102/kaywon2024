// 동기로 파일 삭제하기 - existsSync 함수와 unlinkSync 함수 (결과 비교 파일 : 03\results\unlink-2.js)

const fs = require("fs");
if (!fs.existsSync("./text-1.txt")) {
   console.log("file does not exist");
} else {
   fs.unlinkSync("./text-1.txt");
}