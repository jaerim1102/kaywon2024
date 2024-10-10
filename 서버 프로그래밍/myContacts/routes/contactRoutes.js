const express = require('express');
const router = express.Router();

// 예시 경로 추가
router.get('/', (req, res) => {
   res.send('Contacts route!');
});

// 다른 라우트 설정 추가

module.exports = router; // 라우터를 내보내기
