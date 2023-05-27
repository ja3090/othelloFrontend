import styled from "styled-components";
import { useBoard } from "../context/BoardContext";
import { ReactComponent as Loader } from "../assets/circles.svg";

const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  width: 30rem;
  height: 10rem;
  color: ${({ theme }) => theme.color};
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 500px) {
    height: 10%;
    width: 100vw;
  }
`;

const StatsBox = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const PlayerInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  justify-items: center;
  align-items: center;
`;

const LoadingDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  flex-direction: column;
`;

const SubHeader = styled.h1`
  font-size: 2rem;

  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

const PieceInfo = styled.span`
  border-radius: 50%;
  background-color: ${({ colour }) => colour};
  color: ${({ otherColour }) => otherColour};
  height: 4rem;
  width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 500px) {
    height: 2rem;
    width: 2rem;
  }
`;

export default function Stats() {
  const { playerInfo, board } = useBoard();

  const keys = Object.keys(board);

  const { yourTurn, colour } = playerInfo;

  const gameStarted = yourTurn !== null && colour;

  const otherColour = colour === "white" ? "black" : "white";

  const piecesCount = keys.reduce((acc, curr) => {
    if (!board[curr]) return acc;
    const colour = board[curr];
    return acc[colour]
      ? { ...acc, [colour]: acc[colour] + 1 }
      : { ...acc, [colour]: 1 };
  }, {});

  return (
    <Container>
      {gameStarted ? (
        <StatsBox>
          <PlayerInfo>
            <SubHeader>You</SubHeader>
            <SubHeader>P2</SubHeader>
            <PieceInfo otherColour={otherColour} colour={playerInfo.colour}>
              {piecesCount[playerInfo.colour]}
            </PieceInfo>
            <PieceInfo otherColour={playerInfo.colour} colour={otherColour}>
              {piecesCount[otherColour]}
            </PieceInfo>
          </PlayerInfo>
        </StatsBox>
      ) : (
        <LoadingDisplay>
          <p>Waiting for someone to join...</p>
          <Loader />
        </LoadingDisplay>
      )}
    </Container>
  );
}
