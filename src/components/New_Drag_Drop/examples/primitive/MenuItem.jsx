import React from "react";
import styled from "@emotion/styled";
import { colors } from "@atlaskit/theme";
import { IconButton, Tooltip, Typography } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";

export const grid = 8;
export const borderRadius = 2;
const imageSize = 40;

const getBackgroundColor = (isDragging, isGroupedOver, authorColors) => {
  if (isDragging) {
    return authorColors.soft;
  }

  if (isGroupedOver) {
    return colors.N30;
  }

  return colors.N0;
};

const getBorderColor = (isDragging, authorColors) =>
  isDragging ? "white" : "transparent";

const Container = styled.a`
  border-radius: ${borderRadius}px;
  border: 2px solid transparent;
  border-color: ${colors.DN600};
  background-color: white;
  box-shadow: ${({ isDragging }) =>
    isDragging ? `2px 2px 1px ${colors.N70}` : "none"};
  box-sizing: border-box;
  padding: ${grid}px;
  min-height: ${imageSize}px;
  margin-bottom: ${grid}px;
  user-select: none;
  postion: relative;
  border-radius: 0.3rem;

  /* anchor overrides */
  color: ${colors.N900};

  &:hover,
  &:active {
    color: ${colors.N900};
    text-decoration: none;
  }

  &:focus {
    outline: none;
    border-color: white;
    box-shadow: none;
  }

  /* flexbox */
  display: flex;
`;

const Content = styled.div`
  /* flex child */
  flex-grow: 1;
  position: relative;

  /*
    Needed to wrap text in ie11
    https://stackoverflow.com/questions/35111090/why-ie11-doesnt-wrap-the-text-in-flexbox
  */
  flex-basis: 100%;

  /* flex parent */
  display: flex;
  flex-direction: column;
`;

const BlockQuote = styled.div`
  &::before {
    content: open-quote;
  }

  &::after {
    content: close-quote;
  }
`;

function getStyle(provided, style) {
  if (!style) {
    return provided.draggableProps.style;
  }

  return {
    ...provided.draggableProps.style,
    ...style,
  };
}

const MenuItem = (props) => {
  const {
    data,
    isDragging,
    isGroupedOver,
    provided,
    style,
    isClone,
    index,
    onClickUndo,
    onClickSwap,
  } = props;
  //   console.log("MenuITem", data);

  return (
    <Container
      isDragging={isDragging}
      isGroupedOver={isGroupedOver}
      isClone={isClone}
      //   colors={data.author.colors}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getStyle(provided, style)}
      data-is-dragging={isDragging}
      data-testid={data.id}
      data-index={index}
      aria-label={`${data.title} data`}
    >
      <Content>
        {data?.undo && (
          <Tooltip arrow title="Undo">
            <IconButton
              onClick={() => {
                console.log("UNDO menu 🛩️🛩️🛩️", data);
                onClickUndo(data);
              }}
              size="small"
              sx={{ position: "absolute", right: 1, top: 0 }}
            >
              <UndoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        {data?.swap && (
          <Tooltip arrow title="Swap Back">
            <IconButton
              onClick={() => {
                console.log("SWAP menu 🛩️🛩️🛩️", data);
                onClickSwap(data);
              }}
              size="small"
              sx={{ position: "absolute", right: 1, top: 0 }}
            >
              <UndoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        <Typography
          variant="body2"
          sx={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            width: "100%",
          }}
        >
          {data.title}
        </Typography>
        <Typography
          variant="subtitle2"
          color={colors.N300}
          sx={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            width: "100%",
          }}
        >
          {data?.subTitle.$ref}
        </Typography>
        {/* <Typography variant="subtitle2">{data.id}</Typography> */}
        {/* <Footer>
          <Author colors={quote.author.colors}>{quote.author.name}</Author>
          <QuoteId>id:{quote.id}</QuoteId>
        </Footer> */}
      </Content>
    </Container>
  );
};

export default React.memo(MenuItem);
