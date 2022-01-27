import React from "react";
import styled, { css } from "styled-components";
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import Tag from "components/common/Tag";
import StoreSvg from "components/gather/addGoal/StoreSvg";
import { useNavigate } from "react-router-dom";
import { calc_dDay, calc_days } from "components/gather/addGoal/utils";

const Container = styled.div`
  position: relative;
  margin: 0 -4px;
  height: fit-content;
  padding: 20px 0 12px;
  cursor: pointer;

  ${({ category }) =>
    category === "비상금" &&
    css`
      padding: 20px 0;
    `}
  box-sizing: border-box;
  background-color: #fff;

  ${({ completed }) =>
    completed === true &&
    css`
      pointer-events: none;
      padding: 20px 20px 12px;
      margin: 0;
      border-radius: 12px;
      & + & {
        margin-top: 16px;
      }
    `}
  ${({ completed, category }) =>
    completed !== true && category !== "비상금"
      ? css`
          & + & {
            margin-top: 4px;
          }
          &:last-child {
            padding-bottom: 0;
          }
        `
      : css`
          &:last-child {
            padding-bottom: 4px;
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
      filter: grayscale(100%);
    `}
`;

const Main = styled.div`
  display: flex;
  font-family: "Pretendard-SemiBold";
  color: #333333;
  font-size: 16px;
  line-height: 25px;

  .content {
    flex: 1;
    text-align: left;
  }
  .dDay {
    font-family: Roboto;
    font-size: 12px;
    line-height: 19px;
    color: #212121;
    &.none {
      visibility: hidden;
    }
  }
  .completedState {
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

function StateGather({ props, completed }) {
  const history = useNavigate();
  return (
    <Container
      category={props.category}
      completed={completed}
      onClick={() => {
        history("detail", {
          state: props,
        });
      }}
    >
      <Content completed={completed}>
        <Main>
          <Icon category={props.category}>
            {props.goal_category ? (
              <StoreSvg category={props.goal_category} />
            ) : props.category === "군적금" ? (
              <StoreSvg category="군적금" />
            ) : (
              <StoreSvg category="비상금" />
            )}
          </Icon>
          <div className="content">
            <div>{props.name}</div>
            {props.category !== "비상금" && (
              <div className={completed ? "dDay none" : "dDay"}>
                D-{calc_dDay(props.eDate)}
              </div>
            )}
            {props.category === "비상금" && (
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
          {completed ? <Tag className="tag">{props.category}</Tag> : <></>}
        </Main>
        {props.category !== "비상금" && (
          <State>
            <div className="progressbar">
              <ProgressBar
                percent={(props.currentAmount / props.targetAmount) * 100}
                filledBackground={
                  props.category === "군적금" ? "var(--a2)" : "var(--Blue)"
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
                <span>{props.targetAmount.toLocaleString()}</span> 원
              </div>
            </div>
          </State>
        )}
      </Content>
      {completed ? (
        <CompleteState
          className={
            props.currentAmount >= props.targetAmount ? "success" : "fail"
          }
        >
          {props.currentAmount >= props.targetAmount
            ? "목표 성공"
            : "목표 실패"}
        </CompleteState>
      ) : (
        <></>
      )}
    </Container>
  );
}

export default StateGather;
