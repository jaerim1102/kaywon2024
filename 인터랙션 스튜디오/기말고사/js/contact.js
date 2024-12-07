
const phoneNumber = "010-4075-1175";
const email = "jaerim1102@naver.com";

// 폰 아이콘 클릭 이벤트
document.getElementById("phone").addEventListener("click", () => {
   navigator.clipboard.writeText(phoneNumber).then(() => {
      alert("전화번호를 복사했습니다!");
   }).catch(err => {
      console.error("전화번호 복사 실패:", err);
   });
});

// 메시지 아이콘 클릭 이벤트
document.getElementById("message").addEventListener("click", () => {
   navigator.clipboard.writeText(email).then(() => {
      alert("이메일을 복사했습니다!");
   }).catch(err => {
      console.error("이메일 복사 실패:", err);
   });
});