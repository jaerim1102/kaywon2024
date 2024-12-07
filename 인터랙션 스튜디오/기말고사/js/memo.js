document.addEventListener("DOMContentLoaded", () => {
   const addMemoBtn = document.getElementById("addMemoBtn");
   const memoModal = document.getElementById("memoModal");
   const saveMemoBtn = document.getElementById("saveMemoBtn");
   const cancelMemoBtn = document.getElementById("cancelMemoBtn");
   const memoInput = document.getElementById("memoInput");
   const memoList = document.getElementById("memoList");

   const MEMO_KEY = "memos";

   // Load memos from localStorage
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

   // Save a new memo
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

   // Cancel memo input
   const cancelMemo = () => {
      memoInput.value = "";
      memoModal.classList.add("hidden");
   };

   // Show modal for new memo
   addMemoBtn.addEventListener("click", () => {
      memoModal.classList.remove("hidden");
   });

   // Save and cancel buttons
   saveMemoBtn.addEventListener("click", saveMemo);
   cancelMemoBtn.addEventListener("click", cancelMemo);

   // Initial load
   loadMemos();
});
