import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { css } from "@emotion/react";
import { unselectable } from "@src/util";
import ThemeToggle from "./components/ThemeToggle";
import GitHubIcon from "@mui/icons-material/GitHub";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [height, setHeight] = useState(window.innerHeight);
  const resize = () => {
    setHeight(window.innerHeight);
  };
  useEffect(() => {
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
    const scrollColorBlack = styles.getPropertyValue("--scroll-color-black");

    //dark
    const darkBlack = styles.getPropertyValue("--dark-black");
    const darkWhite = styles.getPropertyValue("--dark-white");
    const darkMint = styles.getPropertyValue("--dark-mint");
    const darkPink = styles.getPropertyValue("--dark-pink");
    const scrollColorWhite = styles.getPropertyValue("--scroll-color-white");

    const docEl = document.documentElement;
    if (darkMode) {
      docEl.style.setProperty("--background", light);
      docEl.style.setProperty("--foreground", black);
      docEl.style.setProperty("--scroll-color", scrollColorBlack);
      docEl.style.setProperty("--highlight", mint);
      docEl.style.setProperty("--paper", white);
      docEl.style.setProperty("--warning", pink);
    } else {
      docEl.style.setProperty("--background", darkBlack);
      docEl.style.setProperty("--foreground", darkWhite);
      docEl.style.setProperty("--scroll-color", scrollColorWhite);
      docEl.style.setProperty("--highlight", darkMint);
      docEl.style.setProperty("--paper", black);
      docEl.style.setProperty("--warning", darkPink);
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
            align-items: center;
            justify-content: space-between;
            height: 48px;

            min-width: 300px;
            padding: 0px 10px;
            ${unselectable}
          `}
        >
          <Typography onClick={() => navigate("/")}>{"개발자 채용"}</Typography>
          <ThemeToggle onClick={toggleTheme} isDark={darkMode} />
        </div>
        <div
          css={css`
            position: absolute;
            top: 48px;
            width: 100%;
            height: calc(${height}px - 48px);
            overflow: auto;
            ${unselectable}
          `}
        >
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </>
    </ThemeProvider>
  );
}
