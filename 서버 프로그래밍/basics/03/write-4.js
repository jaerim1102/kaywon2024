// fs 모듈 writeFile 함수의 flag 옵션 연습하기

const fs = require("fs");

let content = `
 새로운 내용 추가
`;

fs.writeFileSync("text-1.txt", content, { flag: "a" });