import { useAtom } from "jotai"
import { userGridAtom } from "../../GameState"

import styles from "./Grid.module.css"
import Row from "../Row/Row"
import { useEffect } from "react"

function Grid({gridAtom, isUser}) {
    const [grid] = useAtom(gridAtom);

    return (
        <div className={styles.grid}>
            {grid.map((row, rowIndex) => {
                return <Row key={rowIndex} row={row} rowIndex={rowIndex} gridAtom={gridAtom} isUser={isUser}/>
            })}
        </div>
    )
}

export default Grid