const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB 연결
const dbConnect = async () => {
   try {
      const connect = await mongoose.connect(process.env.DB_CONNECT);
      console.log('MongoDB에 연결되었습니다.');
   } catch (error) {
      console.error('MongoDB 연결 에러', error);
   }
}

module.exports = dbConnect;