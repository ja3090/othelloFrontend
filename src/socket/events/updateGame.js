import isGameOver, { noMovesLeft } from "../../utils/isGameOver";

export default function updateGame({
  setBoard,
  colour,
  socket,
  currentGame,
  callSendGame,
  setPlayerInfo,
  setIsGameOverState,
}) {
  return ({ updateBoard }) => {
    setBoard(updateBoard);

    const skipTurn = noMovesLeft(colour, updateBoard);

    if (skipTurn) {
      const gameOver = isGameOver({
        colour: colour,
        board: updateBoard,
      });
      if (gameOver) {
        setIsGameOverState({
          status: true,
          winner: gameOver === "draw" ? "draw" : gameOver === colour,
        });
        return socket.emit("game-over", {
          currentGame,
          winner: gameOver,
        });
      }
      callSendGame(updateBoard);
      return setPlayerInfo((p) => ({ ...p, yourTurn: false }));
    }
    setPlayerInfo((p) => ({ ...p, yourTurn: true }));
  };
}
