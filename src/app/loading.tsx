"use client";
import styled from "styled-components";
import LoadingSpinner from "./components/LoadingSpinner";

const Loading = () => {
  return (
    <Wrapper>
      <LoadingSpinner />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default Loading;
