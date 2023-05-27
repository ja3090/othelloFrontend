import { config } from "../config";

export default function calculateValidMoves({ id, colour, board }) {
  const { moves } = config;

  const generateKey = (row, column) => `row${row}column${column}`;

  const validMoves = moves.map((move) => {
    let path = [];

    let validMove = true;

    let [, ...currentPosition] = id.split(/row|column/);

    const [x, y] = move;

    while (validMove) {
      currentPosition[0] -= x;
      currentPosition[1] -= y;

      const key = generateKey(currentPosition[0], currentPosition[1]);

      const isNextToOwnColour = board[key] === colour && !path.length;

      if (isNextToOwnColour) return (validMove = false);
      if (!board[key]) return (validMove = false);

      path.push({ key, colour: board[key] });

      if (board[key] === colour) break;
    }

    if (!validMove) return validMove;
    return path;
  });

  if (validMoves.every((path) => !path)) return null;

  return validMoves.filter((path) => !!path);
}
