import React from "react";

import { format } from "date-fns";
import styled from "styled-components";

import { NextEpisodeType } from "../../lib/series";

type NextEpisodeProps = {
  item: NextEpisodeType;
};

const NextEpisode: React.FC<NextEpisodeProps> = ({ item }) => {
  if (!item) {
    return (
      <NoInfoWrapper>
        <h3>Next Episode</h3>
        <p>Sorry, no info about the next episode is available yet.</p>
      </NoInfoWrapper>
    );
  }

  return (
    <Container>
      <h3>Next Episode</h3>
      <Box>
        <BoxCol>Name:</BoxCol>
        <p>{item?.name}</p>
      </Box>
      <Box>
        <BoxCol>Airdate:</BoxCol>
        <p>{item ? format(new Date(item.airdate), "iii d MMM, yyyy") : ""}</p>
      </Box>
      <Box>
        <BoxCol>Season:</BoxCol>
        <p>{item?.season}</p>
      </Box>
      <Box>
        <BoxCol>Episode:</BoxCol>
        <p>{item?.episode}</p>
      </Box>
      <Box>
        <BoxCol>Summary:</BoxCol>
        <BoxColSummary
          dangerouslySetInnerHTML={{ __html: item ? item.summary : "" }}
        />
      </Box>
    </Container>
  );
};

export default NextEpisode;

const Container = styled.div`
  width: 100%;
  h3 {
    border-bottom: 1px solid #46b5d1;
    padding: 10px;
    width: 40%;
  }
`;

const NoInfoWrapper = styled.div`
  width: 100%;
  h3 {
    border-bottom: 1px solid #46b5d1;
    padding: 10px;
    width: 40%;
  }
  p {
    color: rgb(212, 212, 212);
    font-size: 15px;
    line-height: 25px;
  }
`;

const Box = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-gap: 15px;
`;

const BoxCol = styled.p`
  text-align: right;
  color: rgb(212, 212, 212);
`;

const BoxColSummary = styled.p`
  color: rgb(212, 212, 212);
  font-size: 15px;
  line-height: 25px;
`;
