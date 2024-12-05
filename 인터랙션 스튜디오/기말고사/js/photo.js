const videoElement = document.getElementById("webcam");
const canvasElement = document.getElementById("canvas");
const shutterButton = document.querySelector(".shutter");

// 웹캠 스트림 시작
async function startWebcam() {
   try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoElement.srcObject = stream;
   } catch (error) {
      console.error("웹캠을 불러오는 데 실패했습니다:", error);
      alert("웹캠에 접근할 수 없습니다. 권한을 확인해주세요.");
   }
}

// 사진 찍기 함수
function takePhoto() {
   // 캔버스 크기를 비디오 크기와 맞춤
   canvasElement.width = videoElement.videoWidth;
   canvasElement.height = videoElement.videoHeight;

   // 캔버스에 현재 웹캠 화면 그리기
   const context = canvasElement.getContext("2d");
   context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

   // 캔버스 이미지를 데이터 URL로 변환 (base64)
   const photoData = canvasElement.toDataURL("image/png");

   // 이미지 다운로드
   downloadPhoto(photoData, "photo.png");
}

// 사진 저장 함수
function downloadPhoto(dataUrl, fileName) {
   const link = document.createElement("a");
   link.href = dataUrl;
   link.download = fileName;
   document.body.appendChild(link); // 링크를 문서에 임시 추가
   link.click(); // 다운로드 트리거
   document.body.removeChild(link); // 링크 제거
}

// 이벤트 리스너 추가
shutterButton.addEventListener("click", takePhoto);

// 페이지 로드 시 웹캠 시작
window.addEventListener("load", startWebcam);
