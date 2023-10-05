// @flow
import styled from "@emotion/styled";
import { colors } from "@atlaskit/theme";
// import { grid } from "../constants";

export const grid = 2;
export const borderRadius = 2;

// $ExpectError - not sure why
export default styled.h4`
  padding: ${grid}px;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;
  height: 10px;
  &:focus {
    outline: 2px solid ${colors.P100};
    outline-offset: 2px;
  }
`;
