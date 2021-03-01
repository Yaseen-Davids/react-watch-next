import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { NextEpisodeType, PreviousEpisodeType, Series } from "../../lib/series";
import PreviousEpisode from "./previousEpsiode";
import NextEpisode from "./nextEpisode";

type SearchedProps = {}

const Searched: React.FC<SearchedProps> = () => {
  const match = useParams<{ searchId: string }>();

  const [item, setItem] = useState<Series>();
  const [loading, setLoading] = useState<boolean>(false);

  const [nextEpisode, setNextEpisode] = useState<NextEpisodeType>();
  const [previousEpisode, setPreviousEpisode] = useState<PreviousEpisodeType>();

  const loadData = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`https://api.tvmaze.com/shows/${match.searchId}`);
      const data = result.data;

      if (data._links.previousepisode) {
        const { data: previousEpisodeResult } = await axios.get(data._links.previousepisode.href);
        console.log("previousEpisodeResult", previousEpisodeResult);
        setPreviousEpisode({
          airdate: previousEpisodeResult.airdate,
          episode: previousEpisodeResult.number,
          medium_image: previousEpisodeResult.image.medium,
          original_image: previousEpisodeResult.image.medium,
          name: previousEpisodeResult.name,
          runtime: previousEpisodeResult.runtime,
          season: previousEpisodeResult.season,
          summary: previousEpisodeResult.summary,
        });
      }
      if (data._links.nextepisode) {
        const { data: nextEpisodeResult } = await axios.get(data._links.nextepisode.href);
        console.log("nextEpisodeResult", nextEpisodeResult);
        // setNextEpisode({
        //   airdate: nextEpisodeResult.airdate,
        //   episode: nextEpisodeResult.number,
        //   medium_image: nextEpisodeResult.image.medium,
        //   original_image: nextEpisodeResult.image.medium,
        //   name: nextEpisodeResult.name,
        //   runtime: nextEpisodeResult.runtime,
        //   season: nextEpisodeResult.season,
        //   summary: nextEpisodeResult.summary,
        // });
      }

      setItem({
        id: data.id,
        genres: data.genres,
        name: data.name,
        language: data.language,
        medium_image: data.image.medium,
        original_image: data.image.original,
        previous_episode: data._links.previousepisode ? data._links.previousepisode.href : "",
        next_episode: data._links.nextepisode ? data._links.nextepisode.href : "",
        premiered: data.premiered,
        rating: data.rating.average,
        runtime: data.runtime,
        status: data.status,
        summary: data.summary,
        updated: data.updated,
      })

    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const searchId = match.searchId;
    console.log("searchId", searchId);
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
    })
    return str;
  }

  return (
    <Container>
      <Wrapper>
        <HeaderContent>
          <HeaderContentImage>
            <img src={item?.medium_image} />
          </HeaderContentImage>
          <HeaderContentSummary>
            <HeaderName>
              <h2>{item?.name}</h2>
              {/* <Button size="tiny">Add to Watchlist</Button> */}
            </HeaderName>
            <p dangerouslySetInnerHTML={{ __html: item ? item.summary : "" }} />
          </HeaderContentSummary>
          <ContentInfo>
            <h3>Show Info</h3>
            <Box>
              <BoxCol>Genre:</BoxCol>
              <p>{getGenresString(item?.genres)}</p>
            </Box>
            <Box>
              <BoxCol>Runtime:</BoxCol>
              <p>{item?.runtime}</p>
            </Box>
            <Box>
              <BoxCol>Status:</BoxCol>
              <p>{item?.status}</p>
            </Box>
            <Box>
              <BoxCol>Rating:</BoxCol>
              <p>{item?.rating}</p>
            </Box>
            <Box>
              <BoxCol>Language:</BoxCol>
              <p>{item?.language}</p>
            </Box>
          </ContentInfo>
        </HeaderContent>
        <RelatedContent>
          <PreviousEpisode item={previousEpisode as any} />
          <NextEpisode item={nextEpisode as any} />
        </RelatedContent>
      </Wrapper>
    </Container>
  )
}

export default Searched;

const Container = styled.div`
  /* padding-top: 10px; */
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
  grid-template-columns: min-content 1fr 350px;
  grid-gap: 20px;
`;

const HeaderContentImage = styled.div`
  height: 300px;
  width: 220px;
`;

const HeaderName = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(212, 212, 212);
  padding: 10px;
`;

const HeaderContentSummary = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
  grid-gap: 20px;
  p {
    font-size: 15px;
    line-height: 25px;
    color: rgb(212, 212, 212);
  }
`;

const ContentInfo = styled.div`
  height: 150px;
  height: 100%;
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

const RelatedContent = styled.div`
  display: flex;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  grid-gap: 30px;
`;