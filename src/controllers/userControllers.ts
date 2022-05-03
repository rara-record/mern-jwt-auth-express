import User from "../model/User";

import bcrypt from "bcrypt"; // 비밀번호 암호화 라이브러리
import { RequestHandler } from "express";
import createHttpError, { InternalServerError } from "http-errors";

export const signupUser: RequestHandler = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    // email이 있다 = 회원가입 되어있음 / 있는 유저 = 스키마에서 email 찾음
    const existingUser = await User.findOne({ email });

    // 이미 있다면, error 실행
    if (existingUser)
      return next(createHttpError(422, "이미 존재하는 이메일입니다!"));

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 8);

    // 유저 생성
    const user = new User({ name, email, password: hashedPassword });

    // 유저 저장
    await user.save();

    // 응답 메세지
    res.json({ message: "회원가입이 완료되었습니다." });
  } catch (error) {
    return next(InternalServerError); // InternalServerError : 서버 에러를 총칭
  }
};

/*
  *bcrypt.hash(): 해싱(Hashing)이란, 
  12345와 같은 Plain Text를 특정 알고리즘(Hash Function)을 통해 잘게 다져서
  fd12fsf@$%4s와 같이 인간이 해독하지 못하는 문자열(Hashed Text)로 변형해주는 것

  hash의 첫번째 인자: 비밀번호의 plain text(암호화를 하지 않은 데이터)
*/
