import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useRootStore } from "@src/store/RootStoreProvider";
import { useEffect, useRef, useState } from "react";
import JobCard from "./JobCards";

function MainPage() {
  const rootStore = useRootStore();
  const layoutWidth = Math.min(1000, rootStore.width - 20);
  const nCol = Math.max(1, Math.floor(layoutWidth / 300));
  const cardWidth = Math.floor(layoutWidth / nCol) - 20;

  const [nowLength, setLength] = useState(
    Math.ceil(rootStore.height / (cardWidth / 1.6)) * nCol * 2
  );

  const onScroll = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const { scrollTop, clientHeight, scrollHeight } = scrollContainer;

    if (scrollTop + clientHeight >= 0.95 * scrollHeight) {
      setLength((v) => v + nCol * 5);
    }
  };

  useEffect(() => {
    setLength(Math.ceil(rootStore.height / (cardWidth / 1.6)) * nCol * 2);
  }, [rootStore.height, rootStore.width]);

  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      css={css`
        overflow: auto;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
      ref={scrollRef}
      onScroll={onScroll}
    >
      <div
        css={css`
          display: flex;
          flex-direction: row;
          width: calc(100% - 25px);

          max-width: 1000px;
          padding: 10px 0px 10px 20px;
          gap: 20px;
          flex-wrap: wrap;
          justify-content: flex-start;
        `}
      >
        {rootStore
          .getJobs()
          .slice(0, nowLength)
          .map((job) => (
            <JobCard job={job} width={cardWidth} />
          ))}
      </div>
    </div>
  );
}

export default observer(MainPage);
