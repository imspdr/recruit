import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useRootStore } from "@src/store/RootStoreProvider";
import { Company, COMPANYS } from "@src/store/types";
import FormatAlignJustifyOutlinedIcon from "@mui/icons-material/FormatAlignJustifyOutlined";

function CompanySelector() {
  const rootStore = useRootStore();
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        gap: 10px;
      `}
    >
      <div
        css={css`
          border-radius: 10px;
          width: ${rootStore.width / 10 - 10}px;
          aspect-ratio: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          max-width: 40px;
          min-width: 20px;
          opacity: ${rootStore.selectedCompanies.length > 0 ? 1 : 0.3};
        `}
        onClick={rootStore.toggleAllCompany}
      >
        <FormatAlignJustifyOutlinedIcon />
      </div>
      {COMPANYS.map((company: Company) => {
        return (
          <img
            src={`/recruit/${company}.svg`}
            css={css`
              border-radius: 10px;
              width: ${rootStore.width / 10 - 10}px;
              aspect-ratio: 1;
              max-width: 40px;
              min-width: 20px;
              opacity: ${rootStore.selectedCompanies.includes(company) ? 1 : 0.3};
            `}
            onClick={() => {
              rootStore.toggleCompany(company);
            }}
          />
        );
      })}
    </div>
  );
}

export default observer(CompanySelector);
