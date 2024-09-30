// 자바스크립트의 비동기 처리  (결과 비교 파일 : 05\results\async-1.js)
console.log("첫 번째 작업");

setTimeout(() => {
   console.log("두 번째 작업");

}, 3000); //3초 후 실행

console.log("세 번째 작업");


