document.addEventListener("DOMContentLoaded", () => {
   const inputWindow = document.querySelector(".input-window");
   const numberFilter = document.querySelector(".number-filter");
   const phoneNumbers = document.querySelectorAll(".numbers img");
   const eraser = document.querySelector(".Eraser");
   const phoneButton = document.querySelector(".phone-number[alt='Phone']"); // Phone 버튼 선택

   // 초기 상태 설정
   inputWindow.textContent = "";
   numberFilter.textContent = "긴급 신고는?";

   // 번호 클릭 이벤트
   phoneNumbers.forEach((number) => {
      number.addEventListener("click", (event) => {
         const numberText = event.target.alt.trim();

         if (numberText && !isNaN(Number(numberText))) {
            inputWindow.textContent += numberText;

            // 112 체크
            if (inputWindow.textContent === "112") {
               numberFilter.textContent = "위급 상황엔 112!";
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
         inputWindow.textContent = currentText.slice(0, -1);

         // 112 체크
         if (inputWindow.textContent === "112") {
            numberFilter.textContent = "위급 상황엔 112!";
         } else {
            numberFilter.textContent = "정확히 입력해 주세요.";
         }
      });
   }

   // Phone 버튼 클릭 이벤트
   if (phoneButton) {
      phoneButton.addEventListener("click", () => {
         if (inputWindow.textContent === "112") {
            alert(
               "112는 국민 비상벨로, 전국 어디에서나 국번 없이 해당 지역의 경찰청에 연결할 수 있는 전화번호입니다. 범죄 신고, 응급 상황 등에 사용할 수 있습니다."
            );
         } else {
            alert("올바른 번호를 입력해 주세요.");
         }
      });
   }
});
