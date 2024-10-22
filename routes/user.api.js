const express = require("express");
const userController = require("../controller/user.controller");
const authController = require("../controller/auth.controller");
const router = express.Router();

// 1. 회원가입 endpoint
router.post("/", userController.createUser);

// 2. 로그인
// get 대신 post를 사용하는 이유는 get은 request body를 사용할 수 없음
// get을 사용하려면 url에 이메일과 패스워드를 넣어야 하는데 이러면 보안상 안되기 때문에
// post를 사용하여 request body에 넣어서 전달하도록 함
router.post("/login", userController.loginWithEmail);

// 토큰을 통해 유저 id 빼내고 그 아이디로 유저 객체 찾아서 보내주기
router.get("/me", authController.authenticate, userController.getUser);

module.exports = router;
