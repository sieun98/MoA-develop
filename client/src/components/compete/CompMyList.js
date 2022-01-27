import styled from "styled-components";
import { BetCompCard, BetEndCompCard } from "./comp/Card";
import { hideScrollBar } from "style/common";
import MyCompContext from "./context/MyCompContext";
import React, { useContext } from "react";

function filterList(cond, compList) {
  let filterdList;
  let cardList = [];

  //ing
  if (!cond) {
    const now = new Date();
    filterdList = compList.filter((obj) => obj.due > now);

    for (const obj of filterdList) {
      cardList.push(<BetCompCard key={obj.key} obj={obj}></BetCompCard>);
    }
  }
  //done
  else {
    const now = new Date();
    filterdList = compList.filter((obj) => obj.due < now);

    for (const obj of filterdList) {
      cardList.push(
        <BetEndCompCard type={false} key={obj.key} obj={obj}></BetEndCompCard>
      );
    }
  }

  return cardList;
}

//리스트-참여중
const StyledMyList = styled.div`
  background-color: var(--Surface);
  height: 480px;

  padding: 0 20px 49px;

  ${hideScrollBar}
`;

const MyList = (props) => {
  const compList = useContext(MyCompContext);

  return <StyledMyList>{filterList(props.cond, compList)}</StyledMyList>;
};

export default MyList;
