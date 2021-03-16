import React from "react";

import styled from "styled-components";

import SearchContainer from "./search";

type HomeContentProps = {};

const HomeContent: React.FC<HomeContentProps> = ({ children }) => {
  return (
    <Container>
      <Content>
        <SearchContainer />
        {children}
      </Content>
    </Container>
  );
};

export default HomeContent;

const Container = styled.div`
  position: relative;
  height: 100%;
  display: grid;
  grid-template-areas: ". content .";
  grid-template-columns: 350px 1fr 350px;
  grid-template-rows: 1fr;
`;

const Content = styled.div`
  grid-area: content;
  display: grid;
  grid-template-rows: min-content 1fr;
`;
