import "./App.css";
import { useAtom } from "jotai";
import { gameStartAtom } from "./GameState";
import Grid from "./components/Grid/Grid";
import {
  userGridAtom,
  computerGridAtom,
  playerTurnAtom,
  computerTurnPickAtom,
  gameWinnerAtom,
  useResetGame,
  useSetUserShips,
  resetGameAtom,
  useCheckWinner,
  logsAtom
} from "./GameState";
import { useEffect } from "react";

function App() {
  const [gameStart, setGameStart] = useAtom(gameStartAtom);
  const [playerTurn, setPlayerTurn] = useAtom(playerTurnAtom);
  const [computerTurnPick, setComputerTurnPick] = useAtom(computerTurnPickAtom);
  const [userGrid, setUserGrid] = useAtom(userGridAtom);
  const [gameWinner, setGameWinner] = useAtom(gameWinnerAtom);
  const [reset, setReset] = useAtom(resetGameAtom);
  const [logs, setLogs] = useAtom(logsAtom);

  useSetUserShips();
  useResetGame();
  useCheckWinner();

  useEffect(() => {
    // Computer Turn
    if (playerTurn === 2 && gameWinner === null) {
      setTimeout(() => {
        let newX = parseInt(Math.random() * 10);
        let newY = parseInt(Math.random() * 10);
        while (userGrid[newX][newY] >= 10) {
          newX = parseInt(Math.random() * 10);
          newY = parseInt(Math.random() * 10);
        }
        setComputerTurnPick([newX, newY]);
        if (userGrid[newX][newY] === 0) {
          setLogs((prevLogs) => {
            const newLogs = [...prevLogs];
            newLogs.push({ message: "Computer ship missed! Your turn.", color: "red" });
            return newLogs
          })
          setPlayerTurn(1);
        } else {
          setLogs((prevLogs) => {
            const newLogs = [...prevLogs];
            newLogs.push({ message: "Computer ship hit a part of your ship!", color: "red" });
            return newLogs
          })
        }
      }, 1000);
    }
  }, [gameWinner, playerTurn, setComputerTurnPick, setLogs, setPlayerTurn, userGrid]);

  return (
    <div>
      <h1>Battleship</h1>
      {gameStart && playerTurn === 1 && !gameWinner && <h2>Your turn</h2>}
      {gameStart && playerTurn === 2 && !gameWinner && (
        <h2 style={{ color: "red" }}>Computer Turn</h2>
      )}
      {gameWinner === 1 && <h2>You Win</h2>}
      {gameWinner === 2 && <h2 style={{ color: "red" }}>Computer Win</h2>}

      <div id="game-board">
        <div>
          <h3>Your Board</h3>
          <Grid gridAtom={userGridAtom} isUser={true} />
        </div>
        <div>
          <h3>Computer Board</h3>
          <Grid gridAtom={computerGridAtom} isUser={false} />
        </div>
        <div id="logs">
          {logs.map((log, index) => {
            return <div className="log" key={index} style={{color: log.color}}>{log.message}</div>
          })}
        </div>
      </div>
      <div
        style={{ width: "fit-content", margin: "auto", marginTop: "1.2rem" }}
      >
        <button
          id="start-btn"
          type="button"
          style={{ padding: "0.3rem" }}
          onClick={() => {
            if (gameStart === false) {
              setGameStart(true);
              setLogs((prevLogs) => {
                const newLogs = [...prevLogs];
                newLogs.push({message:"Game Started, your turn", color: "green"})
                return newLogs;
              })
            }
          }}
        >
          Start Game
        </button>
        <button
          id="reset-btn"
          type="button"
          style={{ padding: "0.3rem" }}
          onClick={() => {
            setReset(true);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
