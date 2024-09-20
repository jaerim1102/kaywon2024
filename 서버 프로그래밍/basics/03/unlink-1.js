// 동기로 파일 삭제하기 (결과 비교 파일 : 03\results\unlink-1.js)

const fs = require("fs");

fs.unlinkSync("./text-1.txt");
console.log("file deleted");