import styled, { css, keyframes } from "styled-components";
import { useBoard } from "../context/BoardContext";

const zoomIn = () => keyframes`
    0% {
      transform: scale(0);
      visibility: visible;
    }

    25% {
      transform: scale(100%);
    }

    90% {
      transform: scale(100%);
    }

    100% {
      transform: scale(0);
      visibility: hidden;
    }
`;

const zoomInOutAnim = () => css`
  animation: ${zoomIn} 5s ease-in-out 0.1s 1 normal;
`;

const Container = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.aside`
  height: 20rem;
  width: 20rem;
  transform: scale(100%);
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.backgroundColor};
  border: 5px solid ${({ theme }) => theme.borderColor};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  visibility: hidden;
  ${zoomInOutAnim}
`;

export default function GameOverModal() {
  const { resetGame, gameOverState } = useBoard();

  return (
    <Container>
      <Modal onAnimationEnd={() => resetGame()}>
        {gameOverState.winner === "draw" ? (
          <h1>Draw!</h1>
        ) : (
          <h1>{gameOverState.winner ? "You win!" : "You lost!"}</h1>
        )}
        <h3>Returning to home...</h3>
      </Modal>
    </Container>
  );
}
