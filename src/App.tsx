import { RouterProvider } from "react-router-dom";
import router from "./router";
import GlobalStyle from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { useRecoilValue } from "recoil";
import { isDarkState } from "./recoilState";

function App() {
  const isDark = useRecoilValue(isDarkState);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
