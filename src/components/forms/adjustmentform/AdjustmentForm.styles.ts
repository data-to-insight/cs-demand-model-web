import styled from "@emotion/styled";
import { spacing } from "@sfdl/sf-mui-components";

const Row = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: ${spacing.s};
`;

interface CellProps {
  width?: "narrow" | "mid" | "wide" | null;
  alignRight?: boolean;
}

const Cell = styled.div<CellProps>`
  text-align: ${(props) => (props.alignRight ? "right" : "left")};
  width: ${(props) => {
    const { width } = props;
    if (width === "mid") {
      return "40%";
    }

    if (width === "wide") {
      return "50%";
    }

    return "20%";
  }};
  padding-right: ${(props) =>
    props.alignRight || props.width !== "narrow" ? 0 : spacing.s};
`;

export { Cell, Row };
