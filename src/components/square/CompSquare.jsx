import { useEffect, useState } from "react"
import { useAtom } from "jotai"
import { gameStartAtom, playerTurnAtom, resetGameAtom, gameWinnerAtom } from "../../GameState"
import styles from "./Square.module.css"

function CompSquare({ x, y, gridAtom }) {
    const [grid, setGrid] = useAtom(gridAtom);
    const [value, setValue] = useState(0);
    const [gameStart, setGameStart] = useAtom(gameStartAtom);
    const [symbol, setSymbol] = useState(<></>);
    const [playerTurn, setPlayerTurn] = useAtom(playerTurnAtom);
    const [reset, setReset] = useAtom(resetGameAtom);
    const [gameWinner, setGameWinner] = useAtom(gameWinnerAtom);
    const [color, setColor] = useState(null);
    
    useEffect(() => {
        setValue(grid[x][y]);
    }, [grid, x, y, reset])

    useEffect(() => {
        setSymbol(<></>)
        setReset(false)
    }, [reset, setReset])

    useEffect(() => {
        if (value === 10) {
            setSymbol(<div style={{ color: "red", fontWeight: "bold" }}>X</div>)
        } else if (value === 20) {
            setSymbol(<div style={{ fontWeight: "bold" }}>.</div>)
        } else {
            setSymbol(<></>)
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
    }, [value, setSymbol])

    return (
        <div
            className={styles.square}
            style={{ borderColor: color, backgroundColor: value === 20 ? "gray" : color }}
            onClick={(gameStart && playerTurn === 1 && gameWinner === null) ? () => {
                if (grid[x][y] > 0 && grid[x][y] < 10) {
                    console.log(grid[x][y])
                    setGrid((prevGrid) => {
                        const newGrid = JSON.parse(JSON.stringify(prevGrid));
                        newGrid[x][y] = 10;
                        return newGrid
                    })
                } else {
                    setGrid((prevGrid) => {
                        const newGrid = JSON.parse(JSON.stringify(prevGrid));
                        newGrid[x][y] = 20;
                        return newGrid
                    })
                    setPlayerTurn(2)
                }
            } : null}
        >
            {symbol}
        </div>
    )
}

export default CompSquare