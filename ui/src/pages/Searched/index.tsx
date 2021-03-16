import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { Button, Icon } from "semantic-ui-react";

import { NextEpisodeType, PreviousEpisodeType, Series } from "../../lib/series";
import PreviousEpisode from "./previousEpsiode";
import NextEpisode from "./nextEpisode";

type SearchedProps = {};

const Searched: React.FC<SearchedProps> = () => {
  const match = useParams<{ searchId: string }>();

  const [item, setItem] = useState<Series>();
  const [loading, setLoading] = useState<boolean>(false);
  const [seasons, setSeasons] = useState<any[]>([]);

  const [nextEpisode, setNextEpisode] = useState<NextEpisodeType>();
  const [previousEpisode, setPreviousEpisode] = useState<PreviousEpisodeType>();

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

      if (data._links.previousepisode) {
        const { data: previousEpisodeResult } = await axios.get(
          data._links.previousepisode.href
        );

        setPreviousEpisode({
          airdate: previousEpisodeResult.airdate,
          episode: previousEpisodeResult.number,
          name: previousEpisodeResult.name,
          runtime: previousEpisodeResult.runtime,
          season: previousEpisodeResult.season,
          summary: previousEpisodeResult.summary,
        });
      }
      if (data._links.nextepisode) {
        const { data: nextEpisodeResult } = await axios.get(
          data._links.nextepisode.href
        );

        setNextEpisode({
          airdate: nextEpisodeResult.airdate,
          episode: nextEpisodeResult.number,
          name: nextEpisodeResult.name,
          runtime: nextEpisodeResult.runtime,
          season: nextEpisodeResult.season,
          summary: nextEpisodeResult.summary,
        });
      }

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

    setPreviousEpisode(undefined);
    setNextEpisode(undefined);

    if (searchId.length > 0) {
      loadData();
    }
  }, [match.searchId]);

  const getGenresString = (genres: string[] = []) => {
    let str = "";
    genres.forEach((genre: string, index: number) => {
      if (index == 0) {
        str = `${genre}`;
      } else {
        str = `${str}, ${genre}`;
      }
    });
    return str;
  };

  return (
    <Container>
      <Wrapper>
        <HeaderContent>
          <HeaderContentImage>
            <img src={item?.medium_image} />
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
              <h2>{item?.name}</h2>
            </HeaderName>
            <HeaderInfoContainer>
              <HeaderInfoIcon>
                <Icon
                  style={{ marginTop: "10px" }}
                  name="circle thin"
                  color={
                    item?.status.toLocaleLowerCase() === "ended"
                      ? "grey"
                      : "green"
                  }
                  size="tiny"
                />
                <p>{item?.status}</p>
              </HeaderInfoIcon>
              <p>|</p>
              <p>
                {seasons.length} {seasons.length === 1 ? "Season" : "Seasons"}
              </p>
              <p>|</p>
              <p>{getGenresString(item?.genres)}</p>
              <p>|</p>
              <HeaderInfoIcon>
                <Icon
                  style={{ marginTop: "6px", marginRight: "5px" }}
                  name="star"
                  color={"yellow"}
                  size="small"
                />
                <p>{item?.rating} / 10</p>
              </HeaderInfoIcon>
            </HeaderInfoContainer>
            <p dangerouslySetInnerHTML={{ __html: item ? item.summary : "" }} />
          </HeaderContentSummary>
        </HeaderContent>
        <RelatedContent>
          <PreviousEpisode item={previousEpisode as any} />
          <NextEpisode item={nextEpisode as any} />
        </RelatedContent>
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

const HeaderName = styled.div``;

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
  grid-template-rows: min-content min-content 1fr;
  grid-gap: 10px;
  p {
    font-size: 16px;
    line-height: 25px;
    color: rgb(212, 212, 212);
  }
`;

const RelatedContent = styled.div`
  display: flex;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  grid-gap: 30px;
`;
