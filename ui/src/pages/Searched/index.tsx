import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { Button, Icon } from "semantic-ui-react";

import { NextEpisodeType, PreviousEpisodeType, Series } from "../../lib/series";
import { AdditionalInfo } from "./AdditionalInfo";
import { EpisodesList } from "./EpisodeList";

type SearchedProps = {};

const Searched: React.FC<SearchedProps> = () => {
  const match = useParams<{ searchId: string }>();

  const [item, setItem] = useState<Series>({
    id: 0,
    genres: [],
    language: "English",
    medium_image: "",
    original_image: "",
    name: "",
    premiered: "",
    previous_episode: {
      airdate: "",
      name: "",
      episode: 0,
      runtime: 0,
      season: 0,
      summary: "",
    },
    next_episode: {
      airdate: "",
      name: "",
      episode: 0,
      runtime: 0,
      season: 0,
      summary: "",
    },
    rating: 0,
    runtime: 0,
    status: "",
    summary: "",
    updated: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [seasons, setSeasons] = useState<any[]>([]);

  const loadData = async () => {
    try {
      setLoading(true);
      const result = await axios.get(
        `https://api.tvmaze.com/shows/${match.searchId}`
      );
      const seasons = await axios.get(
        `http://api.tvmaze.com/shows/${match.searchId}/seasons`
      );

      setSeasons(seasons.data);

      const data = result.data;

      setItem({
        id: data.id,
        genres: data.genres,
        name: data.name,
        language: data.language,
        medium_image: data.image.medium,
        original_image: data.image.original,
        previous_episode: data._links.previousepisode
          ? data._links.previousepisode.href
          : "",
        next_episode: data._links.nextepisode
          ? data._links.nextepisode.href
          : "",
        premiered: data.premiered,
        rating: data.rating.average,
        runtime: data.runtime,
        status: data.status,
        summary: data.summary,
        updated: data.updated,
      });
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const searchId = match.searchId;

    if (searchId.length > 0) {
      loadData();
    }
  }, [match.searchId]);

  return (
    <Container>
      <Wrapper>
        <HeaderContent>
          <HeaderContentImage>
            <img src={item.medium_image} />
            <Button
              fluid
              size="tiny"
              style={{ maxHeight: "30px" }}
              color="green"
            >
              Add to Watchlist
            </Button>
          </HeaderContentImage>
          <HeaderContentSummary>
            <HeaderName>
              <h2>{item.name}</h2>
            </HeaderName>
            <HeaderInfoContainer>
              <HeaderInfoIcon>
                <Icon
                  style={{ marginTop: "8px" }}
                  name="circle thin"
                  color={
                    item.status.toLocaleLowerCase() === "ended"
                      ? "grey"
                      : "green"
                  }
                  size="tiny"
                />
                <p>{item.status}</p>
              </HeaderInfoIcon>
              <p>|</p>
              <p>
                {seasons.length} {seasons.length === 1 ? "Season" : "Seasons"}
              </p>
            </HeaderInfoContainer>
            <p dangerouslySetInnerHTML={{ __html: item ? item.summary : "" }} />
            <AdditionalInfo item={item} />
          </HeaderContentSummary>
        </HeaderContent>
        <EpisodesList seasons={seasons} />
      </Wrapper>
    </Container>
  );
};

export default Searched;

const Container = styled.div`
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 10px;
  position: relative;
  height: 100%;
  color: white;
`;

const Wrapper = styled.div`
  padding: 20px;
  background-color: #222;
  display: grid;
  grid-gap: 20px;
  grid-template-rows: 1fr 1fr;
  width: 100%;
`;

const HeaderContent = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-gap: 20px;
`;

const HeaderContentImage = styled.div`
  height: 330px;
  width: 220px;
  text-align: center;
`;

const HeaderName = styled.div`
  h2 {
    font-size: 2em;
    font-weight: lighter;
  }
`;

const HeaderInfoContainer = styled.div`
  display: flex;
  gap: 10px;
  max-height: 30px;
  &&&& p {
    font-size: 14px;
    color: #999;
  }
`;

const HeaderInfoIcon = styled.div`
  display: flex;
  gap: 5px;
`;

const HeaderContentSummary = styled.div`
  display: grid;
  grid-template-rows: min-content min-content min-content;
  grid-gap: 10px;
  p {
    font-size: 16px;
    line-height: 25px;
    color: rgb(212, 212, 212);
  }
`;
