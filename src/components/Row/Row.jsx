import styles from "./Row.module.css";
import UserSquare from "../square/UserSquare";
import CompSquare from "../square/CompSquare";

function Row({ row, rowIndex, gridAtom, isUser }) {
    return (
        <div className={styles.row}>
            {row.map((_, columnIndex) => (
                isUser ? 
                <UserSquare key={columnIndex} x={rowIndex} y={columnIndex} /> : 
                <CompSquare key={columnIndex} x={rowIndex} y={columnIndex} gridAtom={gridAtom} />
            ))}
        </div>
    );
}

export default Row;
