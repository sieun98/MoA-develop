import React, { Fragment } from "react";
import { useEffect, useState } from "react/cjs/react.development";
import styled, { css } from "styled-components";
import { v1 as uuid } from "uuid";
import MilitaryAutoSavingForm from "./MilitaryAutoSavingForm";
import MilitaryFreeSavingForm from "./MilitaryFreeSavingForm";

function MilitaryFormBox({
  savingType,
  controlNameList,
  item,
  formData,
  userAccountList,
  setFormData,
}) {
  const [monthOptions, setMonthOptions] = useState([]);
  // todo - api
  const userSavingMonth = [6, 7];
  useEffect(() => {
    const dropDownOptions = [];
    for (let index = 0; index < userSavingMonth[1]; index++) {
      const month = userSavingMonth[0] + index;
      dropDownOptions.push(`${month}개월`);
    }
    setMonthOptions(dropDownOptions);
  }, []);

  function resetFormData(type) {
    const FreeSavingFormTemp = {
      savingType: "자유입금",
      formDataMonth: "",
      formDataAccount: userAccountList[0],
    };
    const AutoSavingFormTemp = {
      savingType: "자동이체",
      formDataMonth: "",
      formDataAccount: userAccountList[0],
    };
    if (type === controlNameList[1]) {
      setFormData(FreeSavingFormTemp);
    } else {
      setFormData(AutoSavingFormTemp);
    }
  }
  return (
    <FormBox>
      <SavigType>
        <div className="title">적금방식</div>
        <div className="typeButton">
          {controlNameList.map((name, index) => {
            return (
              <Fragment key={uuid()}>
                <label
                  className={
                    savingType === name
                      ? `isSelect option_${index + 1}`
                      : `option_${index + 1}`
                  }
                  htmlFor={name}
                >
                  {name}
                </label>
                <input
                  type="radio"
                  name="savingType"
                  id={name}
                  value={name}
                  onChange={(e) => {
                    resetFormData(e.target.value);
                  }}
                />
              </Fragment>
            );
          })}
        </div>
      </SavigType>
      {/* 1. 자동이체 */}
      <MilitaryAutoSavingForm savingType={savingType} item={item} />
      {/* 2. 자유입금*/}
      <MilitaryFreeSavingForm
        formData={formData}
        setFormData={setFormData}
        userAccountList={userAccountList}
        userMonthOptions={monthOptions}
        savingType={savingType}
        item={item}
      />
    </FormBox>
  );
}
const MessageStyle = css`
  .message {
    text-align: start;
    font-family: "Pretendard-Regular";
    font-size: 12px;
    line-height: 19px;
    margin-left: 4px;
    color: var(--Body_01);
    margin-bottom: 24px;
    .bold {
      color: var(--Title_02);
    }
    .roboto {
      font-family: "Roboto";
      font-size: 13px;
    }
  }
`;
const FormTile = css`
  font-family: "Pretendard-Medium";
  font-size: 14px;
  line-height: 22px;
  color: var(--Title_02);
  text-align: start;
  margin-left: 4px;
  margin-bottom: 4px;
`;
const typeButton = css`
  .typeButton {
    display: flex;
    align-items: center;
    overflow: hidden;

    label {
      display: block;
      width: 50%;
      height: 44px;
      line-height: 44px;
      box-sizing: border-box;
      background: #ffffff;
      border: 1.5px solid var(--Line_02);
      :hover {
        cursor: pointer;
      }
      &.option_1 {
        border-radius: 8px 0 0 8px;
      }
      &.option_2 {
        border-radius: 0 8px 8px 0;
        margin-left: -1.5px;
      }
      &.isSelect {
        z-index: 10;
        border-color: var(--a2);
      }
    }
    input[type="radio"] {
      margin: 0;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      outline: 0;
      box-shadow: none;
      border: none;
    }
  }
`;
const FormBox = styled.div`
  ${MessageStyle}
  .title {
    ${FormTile}
  }
`;
const SavigType = styled.div`
  margin-bottom: 8px;
  ${typeButton}
`;
export default MilitaryFormBox;
