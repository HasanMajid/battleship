import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'

const userShip1Atom = atom([[0, 0], [0, 1]])
const userShip2Atom = atom([[4, 0], [5, 0]])
const userShip3Atom = atom([[7, 0], [7, 1], [7, 2]])
const userShip4Atom = atom([[8, 4], [8, 5], [8, 6], [8, 7]])
const userShip5Atom = atom([[5, 3]])
const userShip6Atom = atom([[2, 6], [3, 6], [4, 6]])
export const selectedShipIDAtom = atom(null);
export const selectedShipStartAtom = atom(null);

export const gameStartAtom = atom(false);
export const gameWinnerAtom = atom(null);
export const resetGameAtom = atom(false);

// 1 is user and 2 is computer
export const playerTurnAtom = atom(1);

// Keeps track of what square the computer picks
export const computerTurnPickAtom = atom(null);

export const userShips = {
    1: userShip1Atom,
    2: userShip2Atom,
    3: userShip3Atom,
    4: userShip4Atom,
    5: userShip5Atom,
    6: userShip6Atom,
    null: atom(null)
}

/*  
    1-6: ships
    10: hit-ship
    20: disabled
*/

const defaultUserGrid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

export const userGridAtom = atom(defaultUserGrid)

export const useSetUserShips = () => {
    const [userShip1] = useAtom(userShip1Atom);
    const [userShip2] = useAtom(userShip2Atom);
    const [userShip3] = useAtom(userShip3Atom);
    const [userShip4] = useAtom(userShip4Atom);
    const [userShip5] = useAtom(userShip5Atom);
    const [userShip6] = useAtom(userShip6Atom);
    const [, setUserGrid] = useAtom(userGridAtom);

    useEffect(() => {
        setUserGrid(defaultUserGrid)
        const ships = {
            1: userShip1, 2: userShip2, 3: userShip3, 4: userShip4, 5: userShip5, 6: userShip6
        }
        for (const shipID of Object.keys(ships)) {
            for (const shipCoord of ships[shipID]) {
                setUserGrid((prevGrid) => {
                    const newGrid = JSON.parse(JSON.stringify(prevGrid));
                    newGrid[shipCoord[0]][shipCoord[1]] = parseInt(shipID)
                    return newGrid
                })
            }
        }
    }, [setUserGrid, userShip1, userShip2, userShip3, userShip4, userShip5, userShip6])
}

const defaultComputerGrid = [
    [4, 4, 4, 4, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 6],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 6],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
    [0, 0, 0, 0, 0, 3, 3, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 5, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

export const computerGridAtom = atom(
    defaultComputerGrid
)

export const useCheckWinner = () => {
    const [userGrid] = useAtom(userGridAtom);
    const [computerGrid] = useAtom(computerGridAtom);
    const [gameStart] = useAtom(gameStartAtom);
    const [, setGameWinner] = useAtom(gameWinnerAtom);

    useEffect(() => {
        if (gameStart) {
            console.log("checking winner")
            for (const row of computerGrid) {
                if (row.includes(1) || row.includes(2) || row.includes(3) || row.includes(4) || row.includes(5) || row.includes(6)) {
                    console.log(row)
                    return;
                }
            }
            // user wins
            console.log("setting winner 1")
            setGameWinner(1);
        }
    }, [computerGrid, gameStart, setGameWinner])

    useEffect(() => {
        if (gameStart) {
            for (const row of userGrid) {
                if (row.includes(1) || row.includes(2) || row.includes(3) || row.includes(4) || row.includes(5) || row.includes(6)) {
                    return;
                }
            }
            // computer wins
            console.log("setting winner 2")
            setGameWinner(2);
        }
    }, [setGameWinner, gameStart, userGrid])
}

export const useResetGame = () => {
    const [, setUserShip1] = useAtom(userShip1Atom);
    const [, setUserShip2] = useAtom(userShip2Atom);
    const [, setUserShip3] = useAtom(userShip3Atom);
    const [, setUserShip4] = useAtom(userShip4Atom);
    const [, setUserShip5] = useAtom(userShip5Atom);
    const [, setUserShip6] = useAtom(userShip6Atom);
    const [, setUserGrid] = useAtom(userGridAtom);
    const [, setComputerGrid] = useAtom(computerGridAtom);
    const [, setGameStart] = useAtom(gameStartAtom);
    const [reset, setReset] = useAtom(resetGameAtom);
    const [, setWinner] = useAtom(gameWinnerAtom);

    useEffect(() => {
        if (reset === true) {
            setUserShip1([[0, 0], [0, 1]])
            setUserShip2([[4, 0], [5, 0]])
            setUserShip3([[7, 0], [7, 1], [7, 2]])
            setUserShip4([[8, 4], [8, 5], [8, 6], [8, 7]])
            setUserShip5([[5, 3]])
            setUserShip6([[2, 6], [3, 6], [4, 6]])
            setComputerGrid(defaultComputerGrid)
            setReset(false)
            setWinner(null)
            setGameStart(false)
        }
    }, [reset, setComputerGrid, setGameStart, setReset, setUserGrid, setUserShip1, setUserShip2, setUserShip3, setUserShip4, setUserShip5, setUserShip6, setWinner])
}