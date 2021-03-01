import React from "react";

import styled from "styled-components";

type HomeProps = {}

const Home: React.FC<HomeProps> = () => {
  return (
    <Container>
      <p>Children</p>
    </Container>
  )
}

export default Home;

const Container = styled.div`
  position: relative;
  height: 100%;
`;