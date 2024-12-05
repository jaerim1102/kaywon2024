document.addEventListener("DOMContentLoaded", () => {
   const inputWindow = document.querySelector(".input-window");
   const numberFilter = document.querySelector(".number-filter");
   const phoneNumbers = document.querySelectorAll(".numbers img"); // .numbers 하위 img 선택
   const eraser = document.querySelector(".Eraser");

   // 초기 상태 설정
   inputWindow.textContent = "";
   numberFilter.textContent = "긴급 신고는?";

   // 번호 클릭 이벤트
   phoneNumbers.forEach((number) => {
      number.addEventListener("click", (event) => {
         const numberText = event.target.alt.trim(); // 클릭된 이미지의 alt 값

         if (numberText && !isNaN(Number(numberText))) {
            // 숫자만 추가
            inputWindow.textContent += numberText;

            // 112 체크
            if (inputWindow.textContent === "112") {
               numberFilter.textContent = "위급 상황엔 112!!!!";
            } else {
               numberFilter.textContent = "정확히 입력해 주세요.";
            }
         }
      });
   });

   // 지우기 버튼 이벤트
   if (eraser) {
      eraser.addEventListener("click", () => {
         const currentText = inputWindow.textContent;
         inputWindow.textContent = currentText.slice(0, -1); // 마지막 문자 삭제

         // 112 체크
         if (inputWindow.textContent === "112") {
            numberFilter.textContent = "위급 상황엔 112!";
         } else {
            numberFilter.textContent = "정확히 입력해 주세요.";
         }
      });
   }
});
