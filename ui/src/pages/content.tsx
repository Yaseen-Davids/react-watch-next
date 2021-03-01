import React from "react";

import styled from "styled-components";

import SearchContainer from "./search";

type HomeContentProps = {}

const HomeContent: React.FC<HomeContentProps> = ({ children }) => {
  return (
    <Container>
      <MyShowsList />
      <Content>
        <SearchContainer />
        {children}
      </Content>
    </Container>
  )
}

export default HomeContent;

const Container = styled.div`
  position: relative;
  height: 100%;
  display: grid;
  grid-template-columns: 350px 1fr;
  grid-template-rows: 1fr;
`;

const MyShowsList = styled.div`
  /* border-right: 1px solid white; */
`;

const Content = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
`;