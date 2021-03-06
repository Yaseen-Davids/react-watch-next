import React, { useState } from "react";

import styled from "styled-components";
import { Input, Loader, Dropdown } from "semantic-ui-react";
import { debounce } from "debounce-react";
import axios from "axios";
import { useHistory } from "react-router-dom";

type SearchContainerProps = {};

type SearchDataType = {
  key: string;
  text: string;
  value: string;
  image: { avatar: boolean; src: string };
};

const SearchContainer: React.FC<SearchContainerProps> = () => {
  const history = useHistory();

  const [searching, setSearching] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showResult, setShowResult] = useState(false);

  const [searchedData, setSearchedData] = useState<SearchDataType[]>([]);

  const handleSearchChange = (event: any) => {
    const searchString = event.target.value;

    setShowResult(false);
    setSearchValue(searchString);

    debounce(() => handleSearch(searchString), 500);
  };

  const handleSearch = async (search: string) => {
    setSearching(true);
    const resp = await axios.get(
      `http://api.tvmaze.com/search/shows?q=${search}`
    );
    const result: SearchDataType[] = resp.data.map((item: any, idx: number) => {
      return {
        key: idx,
        text: item.show.name,
        value: item.show.id,
        image: {
          avatar: true,
          src: item.show.image
            ? item.show.image.original
            : "https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png",
        },
      };
    });
    setSearchedData(result);
    setSearching(false);
    setShowResult(true);
  };

  const handleSearchSelect = (selectedItem: any) => {
    history.push(`/searched/${selectedItem.value}`);
    setShowResult(false);
  };

  return (
    <Search>
      <div style={{ position: "relative" }}>
        <SearchInput
          fluid
          icon="search"
          value={searchValue}
          iconPosition="left"
          placeholder="Search..."
          onChange={handleSearchChange}
        />
        <SearchDropdown open={showResult}>
          <Dropdown.Menu style={{ width: "400px", marginTop: "-17px" }}>
            {searchedData.map((item) => (
              <Dropdown.Item
                key={item.key}
                text={item.text}
                image={item.image.src}
                description=""
                onClick={() => handleSearchSelect(item)}
              />
            ))}
          </Dropdown.Menu>
        </SearchDropdown>
      </div>
      {searching && <LoadingSpinner active inverted size={"small"} />}
    </Search>
  );
};

export default SearchContainer;

const Search = styled.div`
  padding: 10px;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 50px;
  grid-gap: 10px;
`;

const LoadingSpinner = styled(Loader)`
  &&&&& {
    position: relative;
  }
`;

const SearchInput = styled(Input)`
  &&&&& {
    width: 400px;
    input {
      /* width: 100%; */
      background: #333;
      color: #fff;
    }
  }
`;

const SearchDropdown = styled(Dropdown)`
  &&&&& {
    position: absolute;
    z-index: 10000;
    .menu {
      background: #333;
    }
    .text {
      color: white;
    }
  }
  i {
    display: none;
  }
`;
