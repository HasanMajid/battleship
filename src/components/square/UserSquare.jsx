import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
    userGridAtom,
    userShips,
    selectedShipIDAtom,
    selectedShipStartAtom,
    gameStartAtom,
    computerTurnPickAtom,
    gameWinnerAtom,
    resetGameAtom,
} from "../../GameState";
import styles from "./Square.module.css";

function UserSquare({ x, y }) {
    const [grid, setGrid] = useAtom(userGridAtom);
    const [value, setValue] = useState(0);
    const [selectedShipID, setSelectedShipID] = useAtom(selectedShipIDAtom);
    const [selectedShipStart, setSelectedShipStart] = useAtom(
        selectedShipStartAtom
    );
    const shipAtom = userShips[selectedShipID];
    const [selectedShip, setSelectedShip] = useAtom(shipAtom);

    const [gameStart, setGameStart] = useAtom(gameStartAtom);
    const [gameWinner, setGameWinner] = useAtom(gameWinnerAtom);
    const [computerTurnPick, setComputerTurnPick] = useAtom(computerTurnPickAtom);
    const [reset, setReset] = useAtom(resetGameAtom);
    const [symbol, setSymbol] = useState(<></>);
    const [color, setColor] = useState(null);


    useEffect(() => {
        setValue(grid[x][y]);
    }, [grid, x, y, reset]);

    useEffect(() => {
        setSymbol(<></>);
        setReset(false);
    }, [reset, setReset]);

    useEffect(() => {
        if (computerTurnPick !== null && gameWinner === null) {
            if (computerTurnPick[0] === x && computerTurnPick[1] === y) {
                if (value > 0) {
                    setGrid((prevGrid) => {
                        const newGrid = JSON.parse(JSON.stringify(prevGrid));
                        newGrid[x][y] = 10;
                        return newGrid;
                    });
                } else if (value === 0) {
                    setGrid((prevGrid) => {
                        const newGrid = JSON.parse(JSON.stringify(prevGrid));
                        newGrid[x][y] = 20;
                        return newGrid;
                    });
                } else {
                    setSymbol(<></>);
                }
            }
            setComputerTurnPick(null);
        }
    }, [computerTurnPick, gameWinner, setComputerTurnPick, setGrid, value, x, y]);

    useEffect(() => {
        if (value === 10) {
            setSymbol(<div style={{ color: "red", fontWeight: "bold" }}>X</div>);
        } else if (value === 20) {
            setSymbol(<div style={{ fontWeight: "bold" }}>.</div>);
        }
        if (value === 1) {
            setColor("blue")
        } else if (value === 2) {
            setColor("green")
        } else if (value === 3) {
            setColor("red")
        } else if (value === 4) {
            setColor("aqua")
        } else if (value === 5) {
            setColor("black")
        } else if (value === 6) {
            setColor("pink")
        } else {
            setColor(null)
        }
    }, [value, setSymbol]);

    useEffect(() => {
        // Resets selectedShip on pointerup
        document.addEventListener("pointerup", () => {
            setSelectedShipID(null);
            setSelectedShipStart(null);
        });
    }, [setSelectedShipID, setSelectedShipStart]);

    const checkMoveShip = () => {
        if (selectedShipID && selectedShipStart) {
            const xShift = x - selectedShipStart[0];
            const yShift = y - selectedShipStart[1];
            const newPos = [];
            for (let pos of selectedShip) {
                const newX = pos[0] + xShift;
                const newY = pos[1] + yShift;
                if (newX >= 0 && newX <= 9 && newY >= 0 && newY <= 9) {
                    if (newX + 1 <= 9) {
                        if (
                            grid[newX + 1][newY] !== selectedShipID &&
                            grid[newX + 1][newY] !== 0
                        ) {
                            return;
                        }
                    }
                    if (newX - 1 >= 0) {
                        if (
                            grid[newX - 1][newY] !== selectedShipID &&
                            grid[newX - 1][newY] !== 0
                        ) {
                            return;
                        }
                    }
                    if (newY + 1 <= 9) {
                        if (
                            grid[newX][newY + 1] !== selectedShipID &&
                            grid[newX][newY + 1] !== 0
                        ) {
                            return;
                        }
                    }
                    if (newY - 1 >= 0) {
                        if (
                            grid[newX][newY - 1] !== selectedShipID &&
                            grid[newX][newY - 1] !== 0
                        ) {
                            return;
                        }
                    }

                    if (newX - 1 >= 0 && newY - 1 >= 0) {
                        if (
                            grid[newX - 1][newY - 1] !== selectedShipID &&
                            grid[newX - 1][newY - 1] !== 0
                        ) {
                            return;
                        }
                    }

                    if (newX + 1 <= 9 && newY + 1 <= 9) {
                        if (
                            grid[newX + 1][newY + 1] !== selectedShipID &&
                            grid[newX + 1][newY + 1] !== 0
                        ) {
                            return;
                        }
                    }

                    if (newX - 1 >= 0 && newY + 1 <= 9) {
                        if (
                            grid[newX - 1][newY + 1] !== selectedShipID &&
                            grid[newX - 1][newY + 1] !== 0
                        ) {
                            return;
                        }
                    }

                    if (newX + 1 <= 9 && newY - 1 >= 0) {
                        if (
                            grid[newX + 1][newY - 1] !== selectedShipID &&
                            grid[newX + 1][newY - 1] !== 0
                        ) {
                            return;
                        }
                    }

                    newPos.push([newX, newY]);
                } else {
                    return;
                }
            }
            setSelectedShipStart([x, y]);
            setSelectedShip(newPos);
        }
    };

    return (
        <div
            className={styles.square}
            style={{
                borderColor: color,
                backgroundColor: value === 20 ? "gray" : color,
            }}
            onPointerDown={
                !gameStart
                    ? () => {
                        if (value !== 0) {
                            setSelectedShipID(value);
                            setSelectedShipStart([x, y]);
                        }
                    }
                    : null
            }
            onPointerEnter={!gameStart ? checkMoveShip : null}
        >
            {symbol}
        </div>
    );
}

export default UserSquare;
