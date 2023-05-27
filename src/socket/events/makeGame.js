export const makeGame = (socket, setCurrentGame) => {
  return () =>
    new Promise((rs) => {
      socket.emit("make-game");
      socket.on("join-successful", ({ roomId }) => {
        setCurrentGame(roomId);
        rs();
      });
    });
};
