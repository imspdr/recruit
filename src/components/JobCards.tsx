import { css } from "@emotion/react";
import { Typography } from "@mui/material";
import { Job } from "@src/store/types";
import { useState, useRef } from "react";

export default function JobCard(props: { job: Job; width: number; onClick: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      key={`${props.job.title}`}
      css={css`
        display: flex;
        flex-direction: column;
        border-radius: 10px;
        width: ${props.width}px;
        height: ${props.width / 1.6}px;
        min-width: 200px;
        background-color: var(--paper);
      `}
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}
      onClick={props.onClick}
    >
      {props.job.title}
    </div>
  );
}
