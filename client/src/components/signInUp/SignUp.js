import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {
  styleTitle,
  styleSubTitle,
  styleNotice,
  styleCustomInput,
} from "style/common";
import CustomBtn from "components/gather/addGoal/CustomBtn";
import { hideScrollBar } from "style/common";
import CustomInput from "components/common/CustomInput";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logIn, updateUser } from "../../reducer/userState";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Content = styled.div`
  ${hideScrollBar}
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;

  .title {
    ${styleTitle}
    margin: 24px 0 32px;
  }
  .subTitle {
    ${styleSubTitle}
  }
  .notice {
    ${styleNotice}
    margin: 6px 0 0 4px;
    &.warning {
      display: flex;
      gap: 4px;
      margin-top: 4px;
      color: var(--alert);
    }
  }

  .inputForm {
    width: 100%;
    margin-bottom: 24px;
    label {
      display: block;
      margin: 0 0 4px 4px;
    }
    &:last-child {
      margin-bottom: 60px;
    }
  }

  .signup {
    position: relative;
    display: flex;
    align-items: center;
    gap: 25px;
    margin-top: 25px;

    img {
      position: absolute;
      left: 61px;
    }

    div {
      cursor: pointer;
    }
  }

  .dividedInput {
    display: flex;
    width: 100%;
    gap: 7px;
    align-items: center;

    input {
      ${styleCustomInput}
    }
    .first {
      flex: 1;
      padding: 10px 12px;
      text-align: center;
    }
    .second {
      flex: 1.828828;
      padding: 10px 12px;
    }
  }
`;

function SignUp() {
  const [signUp, setSignUp] = useState({
    name: "",
    rrNumber1: "",
    rrNumber2: "",
    serviceNumber1: "",
    serviceNumber2: "",
    phoneNumber: "",
    password: "",
    checkPassword: "",
  });
  const onChange = (e) => {
    const { id, value } = e.target;
    setSignUp({
      ...signUp,
      [id]: `${id === "rrNumber2" ? value.slice(0, 1) : value}`,
    });
  };
  const focus1 = useRef();
  const focus2 = useRef();

  const validationFunc = {
    validPassword: /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{10,}$/.test(
      signUp.password
    ),
    validCheckPassword:
      signUp.password.length && signUp.password === signUp.checkPassword,
    validPhoneNumber: /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/.test(
      signUp.phoneNumber
    ),
  };

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const history = useNavigate();

  useEffect(() => {
    if (userData.id) {
      history("/home");
    }
  }, []);

  return (
    <Container>
      <Header>
        <img src={require("assets/moa_logo.svg").default} alt="로고이미지" />
      </Header>
      <Content>
        <div className="title">회원가입</div>
        <div className="inputForm">
          <label htmlFor="name" className="subTitle">
            성함
          </label>
          <CustomInput id="name" placeholder="홍길동" onChange={onChange} />
        </div>
        <div className="inputForm">
          <label htmlFor="rrNumber1" className="subTitle">
            주민등록번호
          </label>
          <div className="dividedInput">
            <input
              className="first"
              id="rrNumber1"
              type="number"
              placeholder="생년월일"
              onChange={onChange}
              onKeyUp={(e) => {
                if (signUp[e.target.id].length === 6) {
                  focus1.current.focus();
                }
              }}
              onWheel={(e) => e.target.blur()}
            />
            <span>-</span>
            <input
              type="number"
              maxLength="1"
              value={signUp.rrNumber2}
              className="second"
              id="rrNumber2"
              placeholder=""
              onChange={onChange}
              ref={focus1}
              onWheel={(e) => e.target.blur()}
            />
          </div>
          <div className="notice">
            생년월일 6자리와 뒷번호 맨 앞 1자리를 입력해주세요
          </div>
        </div>
        <div className="inputForm">
          <label htmlFor="serviceNumber1" className="subTitle">
            군번
          </label>
          <div className="dividedInput">
            <input
              type="number"
              className="first"
              id="serviceNumber1"
              placeholder="연도 뒤 2자리"
              onChange={onChange}
              onKeyUp={(e) => {
                if (signUp[e.target.id].length === 2) {
                  focus2.current.focus();
                }
              }}
              onWheel={(e) => e.target.blur()}
            />
            <span>-</span>
            <input
              type="number"
              className="second"
              id="serviceNumber2"
              placeholder="군번 8자리를 입력해주세요"
              onChange={onChange}
              ref={focus2}
              onWheel={(e) => e.target.blur()}
            />
          </div>
        </div>
        <div className="inputForm">
          <label htmlFor="phoneNumber" className="subTitle">
            핸드폰 번호
          </label>
          <CustomInput
            type="number"
            id="phoneNumber"
            placeholder="01012345670"
            onChange={onChange}
          />
          {signUp.phoneNumber.length ? (
            !validationFunc.validPhoneNumber && (
              <div className="notice warning">
                <img
                  src={require("assets/ic_alert.svg").default}
                  alt="입력경고 아이콘"
                />
                잘못된 휴대폰번호 형식입니다
              </div>
            )
          ) : (
            <></>
          )}
        </div>
        <div className="inputForm">
          <label htmlFor="password" className="subTitle">
            비밀번호
          </label>
          <CustomInput
            type="password"
            id="password"
            placeholder="ex) abc1234500"
            onChange={onChange}
            checkable={true}
            checked={validationFunc.validPassword}
          />
          <div className="notice">
            영문, 숫자 포함 10자 이상으로 조합해주세요
          </div>
          {signUp.password.length ? (
            !validationFunc.validPassword && (
              <div className="notice warning">
                <img
                  src={require("assets/ic_alert.svg").default}
                  alt="입력경고 아이콘"
                />
                조건에 맞게 비밀번호를 만들어주세요
              </div>
            )
          ) : (
            <></>
          )}
        </div>
        <div className="inputForm">
          <label htmlFor="checkPassword" className="subTitle">
            비밀번호 확인
          </label>
          <CustomInput
            type="password"
            id="checkPassword"
            placeholder="위 비밀번호와 동일하게 입력해주세요"
            onChange={onChange}
            checkable={true}
            checked={validationFunc.validCheckPassword}
          />
          {signUp.checkPassword.length ? (
            !validationFunc.validCheckPassword && (
              <div className="notice warning">
                <img
                  src={require("assets/ic_alert.svg").default}
                  alt="입력경고 아이콘"
                />
                비밀번호가 일치하지 않습니다
              </div>
            )
          ) : (
            <></>
          )}
        </div>
      </Content>
      <CustomBtn
        active={
          !Object.keys(signUp).filter((x) => signUp[x] === "").length &&
          !Object.keys(validationFunc).filter((x) => validationFunc[x] !== true)
            .length
        }
        path={"/loading"}
        addFunc={() => {
          const newUser = {
            name: signUp.name,
            join_date: "2021-08-01",
            unit: "11사단 화랑부대",
            phone: signUp.phoneNumber,
            key: 0,
            boxList: [],
            rewardList: [],
            accounts: [
              {
                id: 1,
                bankName: "KB국민",
                accountName: "KB나라사랑우대통장",
                accountNumber: "112-0330-0201",
                currentAmount: 500000,
                accountType: "입출금",
                bankImageUrl:
                  "https://raw.githubusercontent.com/BuenCamino3rd/test/0e4636ad19708f8cb18cecc869e0a7ef618c0adf/image/kb.svg",
              },
            ],
          };
          dispatch(
            logIn([signUp.serviceNumber1, signUp.serviceNumber2].join("-"))
          );
          dispatch(updateUser("info", newUser));
        }}
      >
        회원가입
      </CustomBtn>
    </Container>
  );
}

export default SignUp;
