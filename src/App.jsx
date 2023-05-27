import styled from "styled-components";
import Board from "./components/Board";
import OpeningDialogBox from "./components/OpeningDialogBox";
import Stats from "./components/Stats";
import { useBoard } from "./context/BoardContext";
import { createGlobalStyle } from "styled-components";
import GameOverModal from "./components/GameOverModal";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

function App() {
  const { currentGame, gameOverState } = useBoard();

  return (
    <>
      <GlobalStyle />
      {currentGame ? (
        <Container>
          <Stats />
          <Board gameId={currentGame} />
        </Container>
      ) : (
        <Container>
          <OpeningDialogBox />
        </Container>
      )}
      {gameOverState.status && <GameOverModal />}
    </>
  );
}

export default App;
