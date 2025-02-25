import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useRootStore } from "@src/store/RootStoreProvider";
import { Tabs, Tab, Button } from "@mui/material";
import { useState, useRef } from "react";
import JobCard from "./components/JobCards";

function MainPage() {
  const rootStore = useRootStore();
  const layoutWidth = Math.min(1000, rootStore.width - 20);
  const nCol = Math.floor(layoutWidth / 250);
  const cardWidth = Math.floor(layoutWidth / nCol) - 20;
  const scrollRef = useRef<HTMLDivElement>(null);

  const horizontalDisplay = css`
    display: flex;
    flex-direction: row;
    max-width: 1000px;
    padding: 10px 0px 0px 10px;
    gap: 20px;
    flex-wrap: wrap;
    align-content: flex-start;
  `;

  return (
    <div key={"old movies"} css={horizontalDisplay} ref={scrollRef}>
      {rootStore.wholeJobs.map((job) => (
        <JobCard job={job} width={cardWidth} onClick={() => {}} />
      ))}
      <Button
        onClick={() => {}}
        css={css`
          color: var(--highlight);
          display: flex;
          justify-self: center;
          width: 100%;
        `}
      >
        {"더 불러오기"}
      </Button>
    </div>
  );
}

export default observer(MainPage);
