function updateClock() {
   let now = new Date();
   let hours = now.getHours().toString().padStart(2, '0');
   let minutes = now.getMinutes().toString().padStart(2, '0');

   var timeString = `${hours}:${minutes}`;
   document.getElementById('clock').textContent = timeString;
}



setInterval(updateClock, 1000);

updateClock();