import React from "react";

import styled from "styled-components";

import { PreviousEpisodeType } from "../../lib/series";
import { format } from "date-fns";

type PreviousEpisodeProps = {
  item: PreviousEpisodeType;
}

const PreviousEpisode: React.FC<PreviousEpisodeProps> = ({ item }) => {
  return (
    <Container>
      <h3>Previous Episode</h3>
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
        <p dangerouslySetInnerHTML={{ __html: item ? item.summary : "" }} />
      </Box>
    </Container>
  )
}

export default PreviousEpisode;

const Container = styled.div`
  width: 100%;
  h3 {
    border-bottom: 1px solid rgb(212, 212, 212);
    padding: 10px;
    width: 40%;
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