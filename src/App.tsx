import { observer } from "mobx-react";
import { useRootStore } from "@src/store/RootStoreProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { Divider, IconButton, Typography } from "@mui/material";
import { css } from "@emotion/react";
import { unselectable } from "@src/util";
import ThemeToggle from "@src/components/ThemeToggle";
import { FilterAlt } from "@mui/icons-material";
import MainPage from "@src/components/MainPage";
import SearchBar from "@src/components/SearchBar";
import CompanySelector from "@src/components/CompanySelector";
import TagSelector from "@src/components/TagSelector";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
  components: {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "var(--highlight)",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "var(--highlight)",
          },
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "var(--highlight)",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "var(--highlight)",
          },
        },
      },
    },
  },
});

function App() {
  const rootStore = useRootStore();
  const [darkMode, setDarkMode] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const resize = () => {
    rootStore.setWidth(window.innerWidth);
    rootStore.setHeight(window.innerHeight);
  };

  useEffect(() => {
    resize();
    addEventListener("resize", resize);
    return () => {
      removeEventListener("resize", resize);
    };
  }, []);

  const toggleTheme = () => {
    const styles = getComputedStyle(document.body);

    //light
    const black = styles.getPropertyValue("--black");
    const white = styles.getPropertyValue("--white");
    const light = styles.getPropertyValue("--light");
    const mint = styles.getPropertyValue("--mint");
    const pink = styles.getPropertyValue("--pink");
    const red = styles.getPropertyValue("--red");
    const blue = styles.getPropertyValue("--blue");
    const gray = styles.getPropertyValue("--gray");
    const grid = styles.getPropertyValue("--grid");
    const scrollColorBlack = styles.getPropertyValue("--scroll-color-black");

    //dark
    const darkBlack = styles.getPropertyValue("--dark-black");
    const darkWhite = styles.getPropertyValue("--dark-white");
    const darkMint = styles.getPropertyValue("--dark-mint");
    const darkPink = styles.getPropertyValue("--dark-pink");
    const darkBlue = styles.getPropertyValue("--dark-blue");
    const darkRed = styles.getPropertyValue("--dark-red");
    const darkGray = styles.getPropertyValue("--dark-gray");
    const darkGrid = styles.getPropertyValue("--dark-grid");
    const scrollColorWhite = styles.getPropertyValue("--scroll-color-white");

    const docEl = document.documentElement;
    if (darkMode) {
      docEl.style.setProperty("--background", light);
      docEl.style.setProperty("--foreground", black);
      docEl.style.setProperty("--scroll-color", scrollColorBlack);
      docEl.style.setProperty("--highlight", mint);
      docEl.style.setProperty("--paper", white);
      docEl.style.setProperty("--warning", pink);
      docEl.style.setProperty("--chart-red", red);
      docEl.style.setProperty("--chart-blue", blue);
      docEl.style.setProperty("--chart-gray", gray);
      docEl.style.setProperty("--chart-grid", grid);
    } else {
      docEl.style.setProperty("--background", darkBlack);
      docEl.style.setProperty("--foreground", darkWhite);
      docEl.style.setProperty("--scroll-color", scrollColorWhite);
      docEl.style.setProperty("--highlight", darkMint);
      docEl.style.setProperty("--paper", black);
      docEl.style.setProperty("--warning", darkPink);
      docEl.style.setProperty("--chart-red", darkRed);
      docEl.style.setProperty("--chart-blue", darkBlue);
      docEl.style.setProperty("--chart-gray", darkGray);
      docEl.style.setProperty("--chart-grid", darkGrid);
    }
    setDarkMode((v) => !v);
  };
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <>
        <div
          css={css`
            display: flex;
            flex-direction: row;
            justify-content: center;
            height: 48px;
            width: 100%;
            background-color: var(--paper);
            ${unselectable}
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: row;
              width: calc(100% - 20px);
              align-items: center;
              justify-content: space-between;
              max-width: 1000px;
              padding: 0px 10px;
            `}
          >
            <Typography variant="h6" fontWeight="bold">
              {"개발자 채용"}
            </Typography>
            <div
              css={css`
                display: flex;
                flex-direction: row;
                gap: 20px;
              `}
            >
              <IconButton
                onClick={() => setFilterOpen((v) => !v)}
                css={css`
                  background-color: ${filterOpen ? "var(--background)" : "var(--paper)"};
                  margin: 5px;
                `}
              >
                <FilterAlt />
              </IconButton>
              <ThemeToggle onClick={toggleTheme} isDark={darkMode} />
            </div>
          </div>
        </div>

        <Divider
          css={css`
            width: 100%;
          `}
        />
        <div
          css={css`
            position: absolute;
            top: 49px;
            width: 100%;
            height: calc(100% - 49px);
            display: flex;
            flex-direction: column;
            align-items: center;
            ${unselectable}
          `}
        >
          {filterOpen && (
            <>
              <div
                css={css`
                  background-color: var(--paper);
                  width: 100%;
                  padding: 10px 0px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  gap: 10px;
                `}
              >
                <SearchBar />
                <CompanySelector />
                <TagSelector />
              </div>

              <Divider
                css={css`
                  width: 100%;
                `}
              />
            </>
          )}
          <MainPage />
        </div>
      </>
    </ThemeProvider>
  );
}

export default observer(App);
