import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
    gameStartAtom,
    playerTurnAtom,
    resetGameAtom,
    gameWinnerAtom,
    logsAtom
} from "../../GameState";
import styles from "./Square.module.css";

function CompSquare({ x, y, gridAtom }) {
    const [grid, setGrid] = useAtom(gridAtom);
    const [value, setValue] = useState(0);
    const [gameStart, setGameStart] = useAtom(gameStartAtom);
    const [symbol, setSymbol] = useState(<></>);
    const [playerTurn, setPlayerTurn] = useAtom(playerTurnAtom);
    const [reset, setReset] = useAtom(resetGameAtom);
    const [gameWinner, setGameWinner] = useAtom(gameWinnerAtom);
    const [logs, setLogs] = useAtom(logsAtom);
    const [color, setColor] = useState(null);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        setValue(grid[x][y]);
    }, [grid, x, y, reset]);

    useEffect(() => {
        setSymbol(<></>);
        setReset(false);
    }, [reset, setReset]);

    useEffect(() => {
        if (value === 10) {
            setSymbol(<div style={{ color: "red", fontWeight: "bold" }}>X</div>);
        } else if (value === 20) {
            setSymbol(<div style={{ fontWeight: "bold" }}>.</div>);
        } else {
            setSymbol(<></>);
        }

        if (value === 1) {
            setColor("blue");
        } else if (value === 2) {
            setColor("green");
        } else if (value === 3) {
            setColor("red");
        } else if (value === 4) {
            setColor("aqua");
        } else if (value === 5) {
            setColor("white");
        } else if (value === 6) {
            setColor("pink");
        } else {
            setColor(null);
        }
    }, [value, setSymbol]);

    return (
        <div
            className={styles.square}
            style={{
                borderColor: color ? "white" : "gray",
                backgroundColor: value === 20 ? "gray" : color,
            }}
            onClick={
                gameStart && playerTurn === 1 && gameWinner === null && clicked === false
                    ? () => {
                        if (grid[x][y] > 0 && grid[x][y] < 10) {
                            console.log(grid[x][y]);
                            setGrid((prevGrid) => {
                                const newGrid = JSON.parse(JSON.stringify(prevGrid));
                                newGrid[x][y] = 10;
                                return newGrid;
                            });
                            setLogs((prevLogs) => {
                                const newLogs = [...prevLogs];
                                newLogs.push({message: "You have hit a part of a ship, go again!", color: "blue"});
                                return newLogs
                            })
                        } else {
                            setGrid((prevGrid) => {
                                const newGrid = JSON.parse(JSON.stringify(prevGrid));
                                newGrid[x][y] = 20;
                                return newGrid;
                            });
                            setLogs((prevLogs) => {
                                const newLogs = [...prevLogs];
                                newLogs.push({message: "You missed! Computer turn.", color: "blue"});
                                return newLogs
                            })
                            setPlayerTurn(2);
                        }
                        setClicked(true);
                    }
                    : null
            }
        >
            {symbol}
        </div>
    );
}

export default CompSquare;
