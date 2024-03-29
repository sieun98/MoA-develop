import React from "react";
import styled, { css } from "styled-components";
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import Tag from "components/common/Tag";
import StoreSvg from "components/gather/addGoal/StoreSvg";
import { useNavigate } from "react-router-dom";
import { calc_dDay } from "components/gather/addGoal/utils";

const Container = styled.div`
  position: relative;
  height: fit-content;
  padding: 20px 20px 12px;
  box-sizing: border-box;
  background-color: #fff;
  ${({ noneClick }) =>
    noneClick &&
    css`
      box-shadow: 0px 1px 2px rgba(33, 33, 33, 0.08);
      border-radius: 12px;
      pointer-events: none;
      & + & {
        margin-top: 14px;
      }
    `}
  ${({ editToggle }) =>
    !editToggle &&
    css`
      cursor: pointer;
    `}
  
  .safebox {
    padding: 20px 0;
  }

  ${({ completed }) =>
    completed === true &&
    css`
      pointer-events: none;
      border-radius: 12px;
      & + & {
        margin-top: 16px;
      }
    `}
  ${({ completed }) =>
    completed !== true &&
    css`
      & + & {
        border-top: 1px solid var(--Line_03);
      }
      &:last-child {
        padding-bottom: 0;
        &.safebox {
          padding-bottom: 4px;
        }
      }
    `};
`;

const CompleteState = styled.div`
  font-family: "Pretendard-Medium";
  font-size: 12px;
  line-height: 19px;
  position: absolute;
  top: 45px;
  left: 72px;

  &.success {
    color: #4caf5b;
  }
  &.fail {
    color: var(--alert);
  }
`;
const Content = styled.div`
  ${({ completed }) =>
    completed === true &&
    css`
      filter: grayscale(1);
    `}
`;

const Main = styled.div`
  position: relative;
  display: flex;
  font-family: "Pretendard-SemiBold";
  color: #333333;
  font-size: 16px;
  line-height: 25px;

  .content {
    flex: 1;
    overflow: hidden;
    text-align: left;
    .name {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sortHandle {
      cursor: pointer;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  .dDay {
    font-family: Roboto;
    font-size: 12px;
    line-height: 19px;
    color: var(--Body_01);
    &.none {
      visibility: hidden;
    }
  }
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 12px;
  background: #f8f8f8;
  border-radius: 10.2698px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ category }) =>
    category === "목표"
      ? css`
          path.main {
            fill: #28a49d;
          }
        `
      : category === "비상금"
      ? css`
          path.main {
            fill: #f8cb57;
          }
        `
      : css`
          path.main {
            fill: #4caf5b;
          }
        `}
`;

const State = styled.div`
  .progressbar {
    margin: 17px 0 8px;
  }
  .amount {
    display: flex;
    justify-content: space-between;

    font-size: 12px;
    line-height: 19px;
    font-family: "Pretendard-Medium";
    color: var(--Body_02);

    .currentAmount {
      display: flex;
      gap: 2px;
    }
    .targetAmount {
      display: flex;
      gap: 2px;
    }
    span {
      font-family: Roboto;
      font-weight: 500;
    }
    .blackNum {
      color: var(--Title_02);
    }
  }
`;

function StateGather({ props, completed, editToggle, noneClick }) {
  const history = useNavigate();
  return (
    <Container
      noneClick={noneClick}
      editToggle={editToggle}
      className={props.savingMode === "비상금" ? "safebox" : ""}
      category={props.savingMode}
      completed={completed}
      onClick={() => {
        !noneClick &&
          !editToggle &&
          history("detail", {
            state: props,
          });
      }}
    >
      <Content completed={completed}>
        <Main>
          <Icon category={props.savingMode}>
            {props.category ? (
              <StoreSvg category={props.category} />
            ) : props.savingMode === "군적금" ? (
              <img src={props.account.bankImageUrl} />
            ) : (
              <StoreSvg category="비상금" />
            )}
          </Icon>
          <div className="content">
            <div className="name">
              {props.goalName ? props.goalName : props.account.productName}
            </div>
            {editToggle && !completed && (
              <img
                className="sortHandle"
                src={require("assets/ic_sort_handle.svg").default}
                alt="순서변경 버튼"
              />
            )}
            {props.savingMode !== "비상금" && (
              <div className={completed ? "dDay none" : "dDay"}>
                D-{calc_dDay(props.eDate)}
              </div>
            )}
            {props.savingMode === "비상금" && (
              <State style={{ marginTop: "2px" }}>
                <div className="amount">
                  <div className="currentAmount">
                    <span className="blackNum">
                      {props.currentAmount.toLocaleString()}
                    </span>{" "}
                    원
                  </div>
                </div>
              </State>
            )}
          </div>
          {completed || noneClick ? (
            <Tag className="tag">{props.savingMode}</Tag>
          ) : (
            <></>
          )}
        </Main>
        {props.savingMode !== "비상금" && (
          <State>
            <div className="progressbar">
              <ProgressBar
                percent={
                  props.currentAmount < props.goalAmount
                    ? (props.currentAmount / props.goalAmount) * 100
                    : 100
                }
                filledBackground={
                  props.savingMode === "군적금" ? "var(--a2)" : "var(--Blue)"
                }
                unfilledBackground="#EBEBEB"
                height="8px"
              />
            </div>
            <div className="amount">
              <div className="currentAmount">
                <span className="blackNum">
                  {props.currentAmount.toLocaleString()}
                </span>{" "}
                원
              </div>
              <div className="targetAmount">
                <span>{props.goalAmount.toLocaleString()}</span> 원
              </div>
            </div>
          </State>
        )}
      </Content>
      {completed ? (
        <CompleteState
          className={
            props.currentAmount >= props.goalAmount ? "success" : "fail"
          }
        >
          {props.currentAmount >= props.goalAmount ? "목표 성공" : "목표 실패"}
        </CompleteState>
      ) : (
        <></>
      )}
    </Container>
  );
}

export default StateGather;
