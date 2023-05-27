import { useState, createContext, useContext, useMemo } from "react";
import { initialState } from "../utils/board";
import useSocket from "../socket/useSocket";
import addPiece from "../utils/addPiece";

const BoardContext = createContext();

const useBoard = () => {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error("useBoard must be used within a BoardContextProvider");
  }
  return context;
};

const BoardContextProvider = ({ children }) => {
  const [board, setBoard] = useState(initialState);

  const {
    currentGame,
    callMakeGame,
    callJoinGame,
    playerInfo,
    callSendGame,
    resetGame,
    gameOverState,
  } = useSocket(setBoard);

  const { yourTurn, colour } = playerInfo;

  const callAddPiece = addPiece({
    yourTurn,
    colour,
    board,
    callSendGame,
    setBoard,
  });

  const value = useMemo(
    () => ({
      board,
      setBoard,
      callAddPiece,
      yourTurn,
      currentGame,
      playerInfo,
      callMakeGame,
      callJoinGame,
      gameOverState,
      resetGame,
    }),
    [
      board,
      setBoard,
      callAddPiece,
      playerInfo,
      yourTurn,
      currentGame,
      callMakeGame,
      callJoinGame,
      gameOverState,
      resetGame,
    ]
  );

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};

export { useBoard, BoardContextProvider };
