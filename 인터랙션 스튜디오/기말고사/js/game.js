document.addEventListener("DOMContentLoaded", () => {
   const grid = document.querySelector("#grid");
   const width = 10; // 그리드의 너비
   let squares = []; // 그리드의 각 칸을 저장하는 배열
   let currentPosition = 4; // 현재 테트로미노의 위치
   let currentRotation = 0; // 현재 테트로미노의 회전 상태

   // 테트로미노 모양 정의
   const lTetromino = [
      [1, width + 1, width * 2 + 1, 2],
      [width, width + 1, width + 2, width * 2 + 2],
      [1, width + 1, width * 2 + 1, width * 2],
      [width, width * 2, width * 2 + 1, width * 2 + 2],
   ];

   const zTetromino = [
      [0, width, width + 1, width * 2 + 1],
      [width + 1, width + 2, width * 2, width * 2 + 1],
      [0, width, width + 1, width * 2 + 1],
      [width + 1, width + 2, width * 2, width * 2 + 1],
   ];

   const tTetromino = [
      [1, width, width + 1, width + 2],
      [1, width + 1, width + 2, width * 2 + 1],
      [width, width + 1, width + 2, width * 2 + 1],
      [1, width, width + 1, width * 2 + 1],
   ];

   const oTetromino = [
      [0, 1, width, width + 1],
      [0, 1, width, width + 1],
      [0, 1, width, width + 1],
      [0, 1, width, width + 1],
   ];

   const iTetromino = [
      [1, width + 1, width * 2 + 1, width * 3 + 1],
      [width, width + 1, width + 2, width + 3],
      [1, width + 1, width * 2 + 1, width * 3 + 1],
      [width, width + 1, width + 2, width + 3],
   ];

   const tetrominoes = [
      lTetromino,
      zTetromino,
      tTetromino,
      oTetromino,
      iTetromino,
   ];

   // 랜덤으로 테트로미노 선택
   let currentTetromino =
      tetrominoes[Math.floor(Math.random() * tetrominoes.length)][currentRotation];

   // 그리드 생성
   function createGrid() {
      for (let i = 0; i < 200; i++) {
         const square = document.createElement("div");
         grid.appendChild(square);
         squares.push(square);
      }

      // 하단 경계선 (테트로미노가 멈추는 영역)
      for (let i = 0; i < 10; i++) {
         const square = document.createElement("div");
         square.classList.add("taken"); // "taken" 클래스를 추가해 멈추는 영역 표시
         grid.appendChild(square);
         squares.push(square);
      }
   }

   createGrid();

   // 테트로미노를 그린다
   function draw() {
      currentTetromino.forEach((index) => {
         squares[currentPosition + index].classList.add("tetromino");
         squares[currentPosition + index].style.backgroundColor = "yellow";
      });
   }

   // 테트로미노를 지운다
   function undraw() {
      currentTetromino.forEach((index) => {
         squares[currentPosition + index].classList.remove("tetromino");
         squares[currentPosition + index].style.backgroundColor = "";
      });
   }

   // 테트로미노를 아래로 이동
   function moveDown() {
      undraw();
      currentPosition += width;
      draw();
      freeze();
   }

   // 테트로미노가 바닥에 닿거나 다른 블록에 닿으면 멈춘다
   function freeze() {
      if (
         currentTetromino.some((index) =>
            squares[currentPosition + index + width]?.classList.contains("taken")
         )
      ) {
         currentTetromino.forEach((index) =>
            squares[currentPosition + index].classList.add("taken")
         );
         // 줄 완성 확인
         checkRow();
         // 새로운 테트로미노 생성
         currentPosition = 4; // 새로운 테트로미노 초기 위치
         currentRotation = 0; // 초기 회전 상태
         currentTetromino =
            tetrominoes[Math.floor(Math.random() * tetrominoes.length)][currentRotation];
         draw();
      }
   }

   // 한 줄이 완성되었는지 확인하고 삭제
   function checkRow() {
      for (let i = 0; i < 199; i += width) {
         const row = Array.from({ length: width }, (_, k) => i + k);

         // 모든 칸이 "taken" 클래스를 가지고 있다면 한 줄이 완성된 것
         if (row.every((index) => squares[index].classList.contains("taken"))) {
            row.forEach((index) => {
               squares[index].classList.remove("taken");
               squares[index].classList.remove("tetromino");
               squares[index].style.backgroundColor = "";
            });
            // 완성된 줄을 제거하고 위의 칸들을 아래로 이동
            const removedSquares = squares.splice(i, width);
            squares = removedSquares.concat(squares);
            squares.forEach((cell) => grid.appendChild(cell));
         }
      }
   }

   // 테트로미노를 왼쪽으로 이동
   function moveLeft() {
      undraw();
      const isAtLeftEdge = currentTetromino.some(
         (index) => (currentPosition + index) % width === 0
      );

      if (!isAtLeftEdge) currentPosition -= 1;

      if (
         currentTetromino.some((index) =>
            squares[currentPosition + index]?.classList.contains("taken")
         )
      ) {
         currentPosition += 1;
      }

      draw();
   }

   // 테트로미노를 오른쪽으로 이동
   function moveRight() {
      undraw();
      const isAtRightEdge = currentTetromino.some(
         (index) => (currentPosition + index) % width === width - 1
      );

      if (!isAtRightEdge) currentPosition += 1;

      if (
         currentTetromino.some((index) =>
            squares[currentPosition + index]?.classList.contains("taken")
         )
      ) {
         currentPosition -= 1;
      }

      draw();
   }

   // 테트로미노를 회전
   function rotate() {
      undraw();
      currentRotation = (currentRotation + 1) % 4;
      currentTetromino =
         tetrominoes[Math.floor(Math.random() * tetrominoes.length)][currentRotation];
      draw();
   }

   // 키보드 입력 이벤트
   document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") moveLeft(); // 왼쪽 이동
      if (e.key === "ArrowRight") moveRight(); // 오른쪽 이동
      if (e.key === "ArrowDown") moveDown(); // 아래로 이동
      if (e.key === "ArrowUp") rotate(); // 회전
   });

   // 게임 루프 실행
   const timerId = setInterval(moveDown, 1000);
});
