import React from "react";
import { Container, Body, theme as SFTheme } from "@sfdl/sf-mui-components";
import { Start } from "pages";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GatedProps } from "@sfdl/sf-cookie-gate";
import { loadAnalytics } from "utils/analytics";

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
        <Body title="CLA Placement Demand Modelling Tool">
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
