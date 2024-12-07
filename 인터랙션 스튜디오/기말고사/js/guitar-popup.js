document.addEventListener("DOMContentLoaded", () => {
   const popup = document.querySelector(".guitar-popup");
   const popupImage = popup.querySelector("img");
   const popupTitle = popup.querySelector("span");
   const popupArtist = popup.querySelector("p");

   const musicItems = document.querySelectorAll(".guitar-music");
   const audioElements = Array.from(document.querySelectorAll(".guitar-music audio"));

   let currentAudio = null; // 현재 재생 중인 오디오

   // 팝업 표시 함수
   const showPopup = (imgSrc, title, artist) => {
      popupImage.src = imgSrc;
      popupTitle.textContent = title;
      popupArtist.textContent = artist;

      popup.classList.add("active");
   };

   // 팝업 숨김 함수
   const hidePopup = () => {
      popup.classList.remove("active");
   };

   // 팝업 업데이트와 음악 재생 상태 연결
   audioElements.forEach((audio, index) => {
      audio.addEventListener("play", () => {
         const musicItem = musicItems[index];
         const imgSrc = musicItem.querySelector("img").src;
         const title = musicItem.querySelector(".guitar-info span").textContent;
         const artist = musicItem.querySelector(".guitar-info p").textContent;

         showPopup(imgSrc, title, artist);
      });

      audio.addEventListener("pause", hidePopup);
      audio.addEventListener("ended", hidePopup);
   });
});
