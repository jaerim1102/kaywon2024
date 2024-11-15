const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/exhibitions");
        console.log("MongoDB 연결 성공");
    } catch (error) {
        console.error("MongoDB 연결 실패:", error);
    }
};

module.exports = dbConnect;
