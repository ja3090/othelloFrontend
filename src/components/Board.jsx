import { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { ReactComponent as Clipboard } from "../assets/copy-to-clipboard.svg";
import { useBoard } from "../context/BoardContext";
import BoardDisplay from "./BoardDisplay";

const successfullyCopiedKeyframes = () => keyframes`
  0% {
    visibility: hidden;
    opacity: 0;
  }

  1% {
    visibility: visible;
  }

  50% {
    opacity: 1;
  }

  75% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    visibility: hidden;
  }
`;

const successfullyCopiedAnim = () => css`
  animation: ${successfullyCopiedKeyframes} 1s ease-in-out 0.01s 1 normal;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(10, 1fr);
  gap: 0.2rem;
  background-color: ${({ theme }) => theme.bgColorSecondary};
  padding: 3rem 1rem;
  width: 30rem;
  height: 40rem;
  margin-top: 3rem;

  @media (max-width: 500px) {
    width: 100vw;
    padding: 3rem 0;
  }
`;

const GameId = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-row-start: 1/10;
  grid-column: 1/9;
  color: ${({ theme }) => theme.color};
  font-size: 1rem;
  text-align: center;

  @media (max-width: 500px) {
    font-size: 0.8rem;
  }
`;

const SvgContainer = styled.div`
  padding: 0.5rem;
  margin: 0 0.5rem;
  cursor: pointer;
  position: relative;
`;

const SmallToast = styled.div`
  position: absolute;
  height: 100%;
  visibility: hidden;
  opacity: 0;
  ${({ clipboardBtnClicked }) =>
    clipboardBtnClicked ? successfullyCopiedAnim : null}

  @media (max-width: 500px) {
    right: 0%;
  }
`;

const Turn = styled.h1`
  color: ${({ theme }) => theme.color};
  grid-column: 1/9;
  margin: 0;
  text-align: center;
`;

export default function Board({ gameId }) {
  const [clipboardBtnClicked, setClipboardBtnClicked] = useState(false);
  const { playerInfo } = useBoard();

  const game = playerInfo.yourTurn !== null && playerInfo.colour;

  return (
    <Container>
      <BoardGrid>
        {game && <Turn>{playerInfo.yourTurn ? "Your Turn" : "P2's Turn"}</Turn>}
        <GameId>
          ID: {gameId}{" "}
          <SvgContainer
            onClick={async () => {
              await navigator.clipboard.writeText(gameId);
              setClipboardBtnClicked(true);
            }}
          >
            <Clipboard />
            <SmallToast
              clipboardBtnClicked={clipboardBtnClicked}
              onAnimationEnd={() => setClipboardBtnClicked(false)}
            >
              Copied!
            </SmallToast>
          </SvgContainer>
        </GameId>
        <BoardDisplay />
      </BoardGrid>
    </Container>
  );
}
