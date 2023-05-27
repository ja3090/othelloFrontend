import calculateValidMoves from "./calculateValidMoves";

export function noMovesLeft(colour, board) {
  const keys = Object.keys(board);

  const allEmptySpaces = keys.reduce((acc, curr) => {
    if (!board[curr]) return [...acc, curr];
    return acc;
  }, []);

  let noMovesLeft = true;

  for (const key of allEmptySpaces) {
    const validPath = calculateValidMoves({ id: key, colour, board });
    if (validPath) {
      noMovesLeft = false;
      break;
    }
  }

  return noMovesLeft;
}

export default function isGameOver({ colour, board }) {
  const keys = Object.keys(board);

  const otherColour = colour === "white" ? "black" : "white";

  const colourResult = noMovesLeft(colour, board);
  const otherColourResult = noMovesLeft(otherColour, board);

  const noMoreTurns = colourResult && otherColourResult;

  if (noMoreTurns) {
    const filledSpaces = keys.filter((key) => !!board[key]);

    const count = filledSpaces.reduce((acc, curr) => {
      const colour = board[curr];
      return acc[colour]
        ? { ...acc, [colour]: acc[colour] + 1 }
        : { ...acc, [colour]: 1 };
    }, {});

    let winner = count["black"] > count["white"] ? "black" : "white";

    if (count["black"] === count["white"]) {
      winner = "draw";
    }

    return winner;
  }

  return false;
}
