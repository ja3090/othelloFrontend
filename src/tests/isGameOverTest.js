function generateBoard() {
  let arr = [];
  for (let row = 1; row < 9; row++) {
    for (let column = 1; column < 9; column++) {
      arr.push(`row${row}` + `column${column}`);
    }
  }

  return arr.reduce((acc, curr, idx) => {
    if (idx === 0) return { ...acc, [curr]: null };
    if (idx < 32) return { ...acc, [curr]: "white" };
    if (idx < 61) return { ...acc, [curr]: "black" };
    if (idx === 61) return { ...acc, [curr]: null };
    return { ...acc, [curr]: "black" };
  }, {});
}

export const initialState = generateBoard();
