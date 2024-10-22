const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
        required: [true, "전화번호는 필수 입력 항목입니다."],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Contact", contactSchema);