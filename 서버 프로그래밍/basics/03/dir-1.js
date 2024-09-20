// 디렉터리 만들기 - mkdir 함수 (결과 비교 파일 : 03\results\dir-1.js)

const fs = require("fs");

if (fs.existsSync("./test")) {
   console.log("folder already exists");
} else {
   fs.mkdir("./test", (err) => {
      if (err) {
         console.log(err);
      } console.log("folder created");

   })
}