import User from "../model/User";

import bcrypt from "bcrypt"; // 비밀번호 암호화 라이브러리
import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import createHttpError, { InternalServerError } from "http-errors";

export const signupUser: RequestHandler = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    // email이 있다 = 회원가입 되어있음 / 컬렉션에 email 조회
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

export const signinUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // 유저를 찾음
    const user = await User.findOne({ email });

    // 유저가 없다면?
    if (!user) return next(createHttpError(404, "가입된 정보가 없습니다."));

    // 유저가 입력한 비밀번호와, 데이터베이스에 있는 비밀번호 비교
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      return next(createHttpError(401, "비밀번호가 맞지 않습니다."));

    // 응답 메세지
    res.json({ message: "로그인이 완료되었습니다." });
  } catch (error) {
    return next(InternalServerError); // InternalServerError : 서버 에러를 총칭
  }
};

/*
  *bcrypt.hash(plain text, salt, callback): 해싱(Hashing)이란, 
  12345와 같은 Plain Text를 특정 알고리즘(Hash Function)을 통해 잘게 다져서
  fd12fsf@$%4s와 같이 인간이 해독하지 못하는 문자열(Hashed Text)로 변형해주는 것

  hash()의 첫번째 인자: 비밀번호의 plain text(암호화를 하지 않은 데이터)
  hash()의 두번째 인자: salt값, 
*/

/*
  *bcrypt.compare(비교해볼 문자열, 해시값, callback): 비교해주는 메서드

  compare()의 첫번째 인자: 사용자가 입력한 해시값
  compare()의 두번째 인자: 데이터베이스에 저장된 해시값
*/
