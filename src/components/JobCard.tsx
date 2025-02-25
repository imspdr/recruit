import { css } from "@emotion/react";
import { Typography } from "@mui/material";
import { Job } from "@src/store/types";
import { observer } from "mobx-react";
import { useRootStore } from "@src/store/RootStoreProvider";
import { Tabs, Tab, Button } from "@mui/material";
import { useState, useRef } from "react";

function MainPage() {
  const rootStore = useRootStore();
  const layoutWidth = Math.min(1000, rootStore.width);
  const nCol = Math.floor(layoutWidth / 160);
  const cardWidth = Math.floor(layoutWidth / nCol) - 20;

  const scrollRef = useRef<HTMLDivElement>(null);

  const horizontalDisplay = css`
    display: flex;
    flex-direction: row;
    overflow: auto;
    height: calc(100vh - 120px);
    max-width: 1000px;
    gap: 10px;
    flex-wrap: wrap;
    align-content: flex-start;
  `;

  return (
    <>
      <div key={"job-cards"} css={horizontalDisplay} ref={scrollRef}>
        {rootStore.wholeJobs.map((job) => (
          <JobCard job={job} width={cardWidth} onClick={() => {}} />
        ))}
      </div>
    </>
  );
}

export default observer(MainPage);

function JobCard(props: { job: Job; width: number; onClick: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      key={`${props.job.title}`}
      css={css`
        display: flex;
        flex-direction: column;
        border-radius: 10px;
        padding: ${hover ? 0 : 5}px;
        width: ${props.width + (hover ? 10 : 0)}px;
        height: ${props.width * 1.6 + (hover ? 10 : 0)}px;
        background-color: var(--background);
      `}
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}
      onClick={props.onClick}
    >
      <img
        src={props.job.link}
        css={css`
          border-radius: 10px;
          width: ${props.width + (hover ? 10 : 0)}px;
          height: ${props.width * 1.6 + (hover ? 10 : 0)}px;
        `}
      />
    </div>
  );
}
