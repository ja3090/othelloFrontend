import { BoardContextProvider } from "../context/BoardContext";
import { ThemeContextProvider } from "../context/ThemeContext";

export default function Providers({ children }) {
  return (
    <ThemeContextProvider>
      <BoardContextProvider>{children}</BoardContextProvider>
    </ThemeContextProvider>
  );
}
