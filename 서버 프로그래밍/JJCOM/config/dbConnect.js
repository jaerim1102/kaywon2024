const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/exhibitions"); // 불필요한 옵션 제거
        console.log("DB Connected");
    } catch (error) {
        console.error("DB Connection Error: ", error);
        process.exit(1);
    }
};

module.exports = dbConnect;
