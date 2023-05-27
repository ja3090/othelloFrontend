import styled from "styled-components";
import { useBoard } from "../context/BoardContext";

const Tile = styled.div`
  background-color: #00bc8c;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ vacant }) => (vacant ? "cursor: pointer;" : null)}
`;

const Piece = styled.div`
  border-radius: 50%;
  background-color: ${({ colour }) => colour};
  position: absolute;
  height: 90%;
  width: 90%;
`;

export default function BoardDisplay() {
  const { board, callAddPiece } = useBoard();

  const boardKeys = Object.keys(board);

  return (
    <>
      {boardKeys.map((boardKey) => {
        const occupied = board[boardKey];

        if (occupied) {
          return (
            <Tile key={boardKey}>
              <Piece colour={occupied} />
            </Tile>
          );
        }
        return (
          <Tile
            vacant={true}
            onClick={() => callAddPiece(boardKey)}
            key={boardKey}
            id={boardKey}
          />
        );
      })}
    </>
  );
}
