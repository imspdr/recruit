import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useRootStore } from "@src/store/RootStoreProvider";
import { Autocomplete, Box, Chip, TextField } from "@mui/material";
import { Close } from "@mui/icons-material";
import { TAGS } from "@src/store/types";

function TagSelector() {
  const rootStore = useRootStore();
  return (
    <div
      css={css`
        width: calc(100% - 20px);
        max-width: 1000px;
        display: flex;
        align-items: flex-start;
        flex-direction: row;
        gap: 10px;
      `}
    >
      <Autocomplete
        disablePortal
        options={TAGS.map((tag) => {
          return {
            label: tag,
            id: tag,
          };
        })}
        css={css`
          .MuiOutlinedInput-root {
            width: 150px;
            height: 40px;
            border: 1px solid;
            border-color: #ccc;
            border-radius: 10px;
          }
        `}
        renderInput={(params) => <TextField {...params} placeholder="태그 조건" />}
        onChange={(e, v) => {
          if (v && v.id) {
            rootStore.addTag(v.id);
          }
        }}
      />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, alignSelf: "center" }}>
        {rootStore.selectedTags.map((tag, index) => (
          <Chip
            key={index + "selected"}
            label={tag}
            color="success"
            size="small"
            sx={{ fontSize: 10 }}
            icon={
              <Close
                onClick={() => {
                  rootStore.removeTag(tag);
                }}
              />
            }
          />
        ))}
      </Box>
    </div>
  );
}

export default observer(TagSelector);
