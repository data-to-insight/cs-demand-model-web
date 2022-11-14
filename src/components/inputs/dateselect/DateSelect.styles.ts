import styled from "@emotion/styled";
import { spacing } from "theme/spacing";

const DateFieldNarrow = styled.div`
  width: 20%;
  margin-right: ${spacing.m};
`;

const DateFieldMid = styled.div`
  width: 25%;
  margin-right: ${spacing.m};
`;

const DateFieldWide = styled.div`
  width: 40%;
  margin-right: ${spacing.m};
`;

const DateFieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export { DateFieldContainer, DateFieldMid, DateFieldNarrow, DateFieldWide };
