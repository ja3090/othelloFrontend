export default function sendGame({ socket, currentGame, setPlayerInfo }) {
  return (updateBoard) => {
    socket.emit("update-board", { updateBoard, currentGame });
    setPlayerInfo((p) => ({ ...p, yourTurn: false }));
  };
}
