const express = require("express");
const router = express.Router();
const Contact = require("../models/contactModel");

// 모든 연락처 가져오기
router.get("/", async (req, res) => {
    try {
        const contacts = await Contact.find();

        // HTML 형식으로 응답
        let htmlResponse = "<h1>Contacts</h1><ul>";
        contacts.forEach(contact => {
            htmlResponse += `<li>Name: ${contact.name}, Email: ${contact.email}, Phone: ${contact.phone}</li>`;
        });
        htmlResponse += "</ul>";

        res.send(htmlResponse); // 생성된 HTML을 응답
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
