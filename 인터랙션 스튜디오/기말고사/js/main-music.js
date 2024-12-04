document.addEventListener('DOMContentLoaded', function () {
   const playPauseBtn = document.getElementById('playPauseBtn');
   const audio = document.getElementById('audio');

   playPauseBtn.addEventListener('click', function () {
      if (audio.paused) {
         audio.play();
         playPauseBtn.src = './src/img/pause.png'; // 재생 중일 때
      } else {
         audio.pause();
         playPauseBtn.src = './src/img/play.png'; // 멈출 때
      }
   });
});
