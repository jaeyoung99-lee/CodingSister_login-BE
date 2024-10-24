const User = require("../model/User");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      throw new Error("이름, 이메일, 비밀번호는 필수 입력 사항입니다.");
    }

    const user = await User.findOne({ email: email });
    if (user) {
      throw new Error("이미 가입이 된 유저입니다.");
    }
    const salt = bcryptjs.genSaltSync(saltRounds);
    const hash = bcryptjs.hashSync(password, salt);
    console.log("hash", hash); // 비밀번호 암호화된 것 확인
    const newUser = new User({ email, name, password: hash });
    await newUser.save();
    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

userController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }, "-createdAt -updatedAt");
    if (user) {
      const isMatch = bcryptjs.compareSync(password, user.password);
      if (isMatch) {
        const token = user.generateToken();
        return res.status(200).json({ status: "success", user, token });
      }
    }
    throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

userController.getUser = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("can not find user");
    }
    res.status(200).json({ status: "success", user });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

module.exports = userController;
