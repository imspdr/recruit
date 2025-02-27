import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useRootStore } from "@src/store/RootStoreProvider";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function SearchBar() {
  const rootStore = useRootStore();
  const [now, setNow] = useState(rootStore.searchText);
  const debouncedQuery = useDebounce(now, 300);

  useEffect(() => {
    rootStore.setSearchText(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <div
      css={css`
        position: relative;
        width: ${rootStore.width - 40}px;
        max-width: 500px;
        input {
          width: ${rootStore.width - 100}px;
          max-width: 440px;
          padding: 8px 16px 8px 40px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 20px;
          outline: none;
          transition: border-color 0.2s;
          background-color: var(--paper);

          &:focus {
            border-color: var(--highlight);
          }
        }

        svg {
          color: var(--foreground);
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
        }
      `}
    >
      <input
        type="text"
        value={now}
        onChange={(e) => {
          setNow(e.target.value);
        }}
        placeholder="제목 검색"
      />
      <SearchIcon />
    </div>
  );
}

export default observer(SearchBar);
