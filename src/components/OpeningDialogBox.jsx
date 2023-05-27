import { useState } from "react";
import styled from "styled-components";
import { useBoard } from "../context/BoardContext";
import { ReactComponent as GitLogo } from "../assets/gitLogo.svg";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: ${({ theme }) => theme.color};
  text-align: center;
`;

const DialogBox = styled.article`
  max-height: 30rem;
  max-width: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  background-color: ${({ theme }) => theme.bgColorSecondary};
  position: relative;
`;

const Button = styled.button`
  all: unset;
  height: 50%;
  width: 100%;
  margin: 0.5rem 0;
  padding: 1rem 2rem;
  box-sizing: border-box;
  cursor: pointer;
  border: 3px solid ${({ theme }) => theme.borderColor};
`;

const EnterGameId = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.bgColorSecondary};
  height: 15rem;
  width: 20rem;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Input = styled.input`
  background-color: ${({ theme }) => theme.color};
  width: 100%;
`;

const BackButton = styled.button`
  all: unset;
  color: ${({ theme }) => theme.color};
  align-self: flex-start;
  cursor: pointer;
`;

const SvgContainer = styled.div`
  height: 25px;
  width: 25px;
  margin-right: 0.3rem;
`;

const GithubLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Link = styled.a`
  all: unset;
  cursor: pointer;
`;

export default function OpeningDialogBox() {
  const { callMakeGame, callJoinGame } = useBoard();
  const [joinGameWindow, setIsOpen] = useState(false);
  const [gameId, setGameId] = useState("");

  return (
    <Container>
      <DialogBox>
        <GithubLinks>
          <SvgContainer>
            <GitLogo />
          </SvgContainer>
          <h4>
            <Link href="https://github.com/jaw163/othelloFrontend">Front</Link>{" "}
            | <Link href="https://github.com/jaw163/othelloBackend">Back</Link>
          </h4>
        </GithubLinks>
        <Button
          onClick={async () => {
            await callMakeGame();
          }}
        >
          Make Game
        </Button>
        <Button onClick={() => setIsOpen(true)}>Join a Game</Button>
        {joinGameWindow && (
          <EnterGameId>
            <BackButton
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Back
            </BackButton>
            <Input onChange={(e) => setGameId(e.target.value)} />
            <Button
              onClick={async () => {
                await callJoinGame(gameId).catch((err) => console.error(err));
              }}
            >
              Enter
            </Button>
          </EnterGameId>
        )}
      </DialogBox>
    </Container>
  );
}
