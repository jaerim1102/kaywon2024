document.addEventListener("DOMContentLoaded", () => {
   const addMemoBtn = document.getElementById("addMemoBtn");
   const memoModal = document.getElementById("memoModal");
   const saveMemoBtn = document.getElementById("saveMemoBtn");
   const cancelMemoBtn = document.getElementById("cancelMemoBtn");
   const memoInput = document.getElementById("memoInput");
   const memoList = document.getElementById("memoList");

   const MEMO_KEY = "memos";

   // 로컬스토리지에서 메모 불러오기
   const loadMemos = () => {
      const memos = JSON.parse(localStorage.getItem(MEMO_KEY)) || [];
      memoList.innerHTML = "";
      memos.forEach((memo) => {
         const memoItem = document.createElement("div");
         memoItem.classList.add("memo-item");
         memoItem.textContent = memo;
         memoList.appendChild(memoItem);
      });
   };

   // 메모 저장
   const saveMemo = () => {
      const memoText = memoInput.value.trim();
      if (!memoText) return;

      const memos = JSON.parse(localStorage.getItem(MEMO_KEY)) || [];
      memos.push(memoText);
      localStorage.setItem(MEMO_KEY, JSON.stringify(memos));

      memoInput.value = "";
      memoModal.classList.add("hidden");
      loadMemos();
   };

   // 모달창 닫기
   const cancelMemo = () => {
      memoInput.value = "";
      memoModal.classList.add("hidden");
   };

   // 모달 열기
   addMemoBtn.addEventListener("click", () => {
      memoModal.classList.remove("hidden");
   });

   // 저장 / 취소
   saveMemoBtn.addEventListener("click", saveMemo);
   cancelMemoBtn.addEventListener("click", cancelMemo);

   loadMemos();
});
