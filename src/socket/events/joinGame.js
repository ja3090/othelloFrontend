export const joinGame = ({ socket, setCurrentGame, setPlayerInfo }) => {
  return (roomId) =>
    new Promise((rs, rj) => {
      socket.emit("join-game", { roomId });
      socket.on("start-game", (playerInfo) => {
        setCurrentGame(roomId);
        setPlayerInfo(playerInfo);
        rs();
      });
      socket.on("join-game-error", ({ error }) => {
        rj(error);
      });
    });
};
