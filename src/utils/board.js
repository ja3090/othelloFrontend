export function generateBoard() {
  let arr = [];
  for (let row = 1; row < 9; row++) {
    for (let column = 1; column < 9; column++) {
      arr.push(`row${row}` + `column${column}`);
    }
  }

  return arr.reduce((acc, curr) => {
    if (curr === "row4column4" || curr === "row5column5") {
      return { ...acc, [curr]: "black" };
    }
    if (curr === "row4column5" || curr === "row5column4") {
      return { ...acc, [curr]: "white" };
    }

    return { ...acc, [curr]: null };
  }, {});
}

export const initialState = generateBoard();
