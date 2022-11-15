import React from "react";
import { Container } from "./components/layout";
import { Start } from "pages";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GatedProps } from "@sfdl/sf-cookie-gate";
import { loadAnalytics } from "utils/analytics";
import { Body } from "components/layout";

import { theme as SFTheme } from "./theme/theme";

const theme = createTheme(SFTheme);

loadAnalytics();

type LandingProps = {} & GatedProps;

const Landing = (props: LandingProps) => {
  const handleClick = () => {
    props.setCookieHandler();
    window.location.reload();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Body>
          <Start
            onClick={() => {
              handleClick();
            }}
          />
        </Body>
      </Container>
    </ThemeProvider>
  );
};

export default Landing;
