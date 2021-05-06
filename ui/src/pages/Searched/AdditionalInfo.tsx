import React from "react";

import { format } from "date-fns";
import styled from "styled-components";

import { Series } from "../../lib/series";

export const AdditionalInfo: React.FC<{ item: Series }> = ({ item }) => {
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
    <AdditionalInfoWrapper>
      <div>
        <p>
          <TextImportant>Rating</TextImportant>: <span>{item.rating} / 10</span>
        </p>
        <p>
          <TextImportant>Genres</TextImportant>: {getGenresString(item.genres)}
        </p>
        <p>
          <TextImportant>Language</TextImportant>: {item.language}
        </p>
      </div>
      <div>
        <p>
          <TextImportant>Premiered</TextImportant>:{" "}
          {format(new Date(), "iii, MMM dd yyyy")}
        </p>
        <p>
          <TextImportant>Runtime</TextImportant>: {item.runtime}
        </p>
      </div>
    </AdditionalInfoWrapper>
  );
};

const AdditionalInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  &&&& p {
    font-size: 14px;
    color: rgb(185, 185, 185);
    line-height: 13px;
  }
`;

const TextImportant = styled.span`
  color: #999;
`;
