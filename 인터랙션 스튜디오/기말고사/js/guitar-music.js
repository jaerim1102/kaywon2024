document.addEventListener("DOMContentLoaded", () => {
   const musicItems = document.querySelectorAll(".guitar-music");
   const playButton = document.querySelector(".guitar-button button:first-child");
   const shuffleButton = document.querySelector(".guitar-button button:last-child");
   const audioElements = Array.from(document.querySelectorAll(".guitar-music audio"));

   let currentIndex = 0;

   // 음악 재생 함수
   const playMusic = (index) => {
      audioElements.forEach((audio, idx) => {
         if (idx === index) {
            audio.play();
         } else {
            audio.pause();
            audio.currentTime = 0;
         }
      });
   };

   // 모든 음악 클릭 이벤트 추가
   musicItems.forEach((item, index) => {
      item.addEventListener("click", () => {
         playMusic(index);
      });
   });

   // 순차 재생 버튼 동작
   playButton.addEventListener("click", () => {
      currentIndex = 0;
      playMusic(currentIndex);

      audioElements.forEach((audio, index) => {
         audio.onended = () => {
            if (index < audioElements.length - 1) {
               playMusic(index + 1);
            }
         };
      });
   });

   // 셔플 재생 버튼 동작
   shuffleButton.addEventListener("click", () => {
      let shuffledIndices = audioElements.map((_, index) => index);
      shuffledIndices = shuffledIndices.sort(() => Math.random() - 0.5);

      let currentShuffleIndex = 0;

      const playNextShuffled = () => {
         const nextIndex = shuffledIndices[currentShuffleIndex];
         playMusic(nextIndex);
         currentShuffleIndex++;

         if (currentShuffleIndex < shuffledIndices.length) {
            audioElements[nextIndex].onended = playNextShuffled;
         }
      };

      playNextShuffled();
   });
});
