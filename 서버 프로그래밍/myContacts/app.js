const express = require("express");
const path = require("path");
// const errorhandler = require("./middlewares/errorhandler");
const app = express();
// const router = express.Router();
const port = 3000;


// app.get("/", (req, res) => {
//     res.status(200).res.send("hello Nade!");
//     // res.json({message: "Hello Node!"});
// });
// app.get("/test", (req, res, next)=> {
//     const error = new Error("테스트용 에러"); // 오류 생성
//     error.status = 401;
//     next(error);    // 다음 미들 웨어로 넘김
// });

// const logger = (req, res, next)=>{
//     console.log("User Logged");
//     next();
// };

// const path = require("path");
// app.get("/contactas", (req, res)=>{
//     res.status(200);
//     res.sendFile(path.join(__dirname, "index.html"));
// });

// router.get("/contacts", (req, res) => {
//     res.status(200).send("Contacts Page");
// });
// app.get("/contacts", (rrq, res)=>{
//     res.status(200).send("Contacts Page");
// });

// router.post("/contacts", (req, res)=>{
//     res.status(201).send("Create Contacts");
// });
// app.post("/contacts", (req, res)=>{
//     res.status(201).send("Create Contacts");
// });

// router.get("/contacts/:id", (req, res)=>{
//     res.status(200).send(`View Contact for ID: ${req.params.id}`);
// });
// app.get("/contacts/:id", (req, res)=>{
//     res.status(200).send(`View Contact for ID: ${req.params.id}`);
// });


// router.put("/contacts/:id", (req, res)=>{
//     res.status(200).send(`Update Contact for ID: ${req.params.id}`);
// });
// app.put("/contacts/:id", (req, res)=>{
//     res.status(200).send(`Update Contact for ID: ${req.params.id}`);
// });

// router.delete("/contacts/:id", (req, res)=>{
//     res.status(200).send(`Delete Contact for ID: ${req.params.id}`);
// });
// app.delete("/contacts/:id", (req, res)=>{
//     res.status(200).send(`Delete Contact for ID: ${req.params.id}`);
// });

// app.get("/", (req, res)=>{
//     const headers = req.headers;
//     res.send(headers);
// });


// app.use(express.urlencoded({extended: true}));

// app.use(logger)

// const requestTime = (req, res, next)=>{
//     let today = new Date(); // Date 객체 만들기
//     let now = today.toLocaleTimeString();   // 현재 시간을 문자열로 바꾸기
//     req.requestTime = now;  // req 객체에 requestTime 속성 추가하기
//     next();
// }
// app.use(requestTime);   // requestTime 미들웨어 사용

// app.route("/").get((req, res)=>{
//     // res.status(200).send("Hello Node!");
//     const responseText = `Hello Node! \n요청 시간 : ${req.requestTime}`;
//     res.set("Content-type", "text/plain");
//     res.send(responseText);
// });

// app.use(logger);
app.use(express.json());
app.use("/contacts", require("./routes/contactRoutes"));

// app.use(errorhandler);

app.listen(port, () => {
   console.log(`${port}번 포트에서 서버 실행 중`);
});
