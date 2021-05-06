import React, { useMemo, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import styled from "styled-components";

type EpisodesListProps = {
  seasons: any[];
};

export const EpisodesList: React.FC<EpisodesListProps> = ({ seasons }) => {
  const [selectedSeason, setSelectedSeason] = useState<number>(1);

  const seasonsList = useMemo(() => {
    return seasons.map((season) => ({
      key: season.number,
      text: `Season ${season.number}`,
      value: season.number,
    }));
  }, [seasons]);

  const handleSeasonChange = (_: any, data: any) => {
    setSelectedSeason(data.value);
  };

  return (
    <Container>
      <DropdownWrapper>
        <Dropdown
          fluid
          selection
          options={seasonsList}
          value={selectedSeason}
          placeholder="Select season"
          onChange={handleSeasonChange}
        />
      </DropdownWrapper>
      <div></div>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
  height: 300px;
  border: 1px solid white;
`;

const DropdownWrapper = styled.div`
  padding: 10px;
`;
