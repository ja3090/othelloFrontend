import calculateValidMoves from "./calculateValidMoves";

export default function addPiece({
  yourTurn,
  colour,
  board,
  callSendGame,
  setBoard,
}) {
  return (id) => {
    if (!yourTurn) return;

    const validPaths = calculateValidMoves({ id, colour, board });

    if (!validPaths) return;

    validPaths.forEach((path) => {
      path.forEach((piece) => {
        const { key } = piece;

        setBoard((p) => ({ ...p, [key]: colour }));
      });
    });

    setBoard((p) => {
      const updateBoard = { ...p, [id]: colour };
      callSendGame(updateBoard);
      return updateBoard;
    });
  };
}
