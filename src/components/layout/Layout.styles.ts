import styled from "@emotion/styled";

import { spacing } from "theme/spacing";
import { typography } from "theme/typography";

const PageWrapper = styled.div`
  width: 100%;
  margin: ${spacing.l} ${spacing.s};
  font-family: ${typography};
`;

const DualButton = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export { DualButton, PageWrapper };
