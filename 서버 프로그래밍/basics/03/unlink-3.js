// 비동기로 파일 삭제하기 - unlink 함수 (결과 비교 파일 : 03\results\unlink-3.js)

const fs = require("fs");

if (!fs.existsSync("./text-2.txt")) {// 파일이 없다면
   console.log("file does not exist");
} else { //파일이 있다면
   fs.unlink("./text-2.txt", () => {
      console.log("file deleted");

   })
}