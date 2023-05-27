import { socket } from "./socket";
import { useEffect, useState, useCallback } from "react";
import { makeGame } from "./events/makeGame";
import { joinGame } from "./events/joinGame";
import updateGame from "./events/updateGame";
import sendGame from "./events/sendGame";
import { generateBoard } from "../utils/board";

export default function useSocket(setBoard) {
  const [currentGame, setCurrentGame] = useState(null);
  const [playerInfo, setPlayerInfo] = useState({
    yourTurn: null,
    colour: null,
  });
  const [gameOverState, setIsGameOverState] = useState({
    status: false,
    winner: null,
  });

  const callSendGame = sendGame({ socket, currentGame, setPlayerInfo });
  const callUpdateGame = updateGame({
    setBoard,
    colour: playerInfo.colour,
    socket,
    currentGame,
    callSendGame,
    setPlayerInfo,
    setIsGameOverState,
  });
  const callMakeGame = makeGame(socket, setCurrentGame);
  const callJoinGame = joinGame({ socket, setCurrentGame, setPlayerInfo });

  function onConnect() {
    console.log("Connected");
  }

  function resetGame() {
    setCurrentGame(null);
    setPlayerInfo({ yourTurn: null, colour: null });
    setIsGameOverState({ status: false, winner: null });
    const newBoard = generateBoard();
    setBoard(newBoard);
  }

  const onGameOver = useCallback(
    ({ winner }) =>
      setIsGameOverState({
        status: true,
        winner: winner === "draw" ? "draw" : winner === playerInfo.colour,
      }),
    [playerInfo.colour]
  );

  function onStartGame(playerInfo) {
    setPlayerInfo(playerInfo);
  }

  useEffect(() => {
    socket.connect();
    socket.on("connect", onConnect);
    socket.on("game-over", onGameOver);
    socket.on("update-board", callUpdateGame);

    return () => {
      socket.off("connect", onConnect);
      socket.off("game-over", onGameOver);
      socket.off("update-board", callUpdateGame);
    };
  }, [callUpdateGame, onGameOver]);

  useEffect(() => {
    if (!currentGame) return;

    socket.on("start-game", onStartGame);

    return () => socket.off("start-game", onStartGame);
  }, [currentGame, setPlayerInfo]);

  return {
    currentGame,
    callMakeGame,
    callJoinGame,
    playerInfo,
    setPlayerInfo,
    callSendGame,
    gameOverState,
    resetGame,
  };
}
