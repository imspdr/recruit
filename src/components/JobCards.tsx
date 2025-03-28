import { css } from "@emotion/react";
import { Typography, Box, Chip } from "@mui/material";
import { Job } from "@src/store/types";
import { useState } from "react";

const jobCardContainer = (width: number, padding: number, hover: boolean) => css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  width: ${width - padding * 2}px;
  height: ${width / 3.8 - padding * 2}px;
  padding: ${padding + (hover ? -1 : 0)}px;
  background-color: var(--paper);
  overflow: hidden;
  ${hover && "border: 1px solid;"}
`;

const jobCardInner = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`;

const imgStyle = (titleFontSize: number) => css`
  border-radius: 10px;
  width: ${titleFontSize * 3}px;
  height: ${titleFontSize * 3}px;
`;
export default function JobCard(props: { job: Job; width: number }) {
  const [hover, setHover] = useState(false);
  const { job, width } = props;
  const titleFontSize = Math.max(width / 20, 12);
  const textFontSize = Math.max(width / 30, 8);
  const PADDING = 15;
  return (
    <div
      key={`${job.title}`}
      css={jobCardContainer(width, PADDING, hover)}
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}
      onClick={() => {
        window.open(job.link, "_blank", "noopener,noreferrer");
      }}
    >
      <div css={jobCardInner}>
        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: titleFontSize }}>
          {job.title}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary" sx={{ fontSize: textFontSize }}>
            {job.sub}
          </Typography> */}
        <img src={`/recruit/${job.company}.svg`} css={imgStyle(titleFontSize)} />
      </div>
    </div>
  );
}
