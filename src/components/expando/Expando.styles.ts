import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { spacing } from "theme/spacing";

type ContentContainerProps = {
  open?: boolean;
};

const IconContainer = styled.span`
  display: inline-block;
  margin-right: ${spacing.m};
`;

const ContentContainer = styled.div<ContentContainerProps>`
  display: ${(props) => (props.open ? "block" : "none")};
`;

const TriggerText = {
  text: {
    textDecoration: "underline",
  },
};

export { IconContainer, ContentContainer, TriggerText };
