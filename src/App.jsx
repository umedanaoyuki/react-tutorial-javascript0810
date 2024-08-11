import { useState } from "react";
import "./style.css";

export default function Board() {
  // 先手がデフォルトで “X” になるようにするためのstate（次に表示されるのがXかどうかを判断するための状態）
  const [xIsNext, setXIsNext] = useState(true);

  // 9つのマス目を配列でもつようにstateを作成
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    // squaresという状態を直接変更するのではなく、nextSquaresという新しい配列を作成する
    const nextSquares = squares.slice();

    if (xIsNext) {
      // i番目のマス目だけに「X」を代入
      nextSquares[i] = "X";
    } else {
      // falseの場合は Xではなく、0を代入
      nextSquares[i] = "0";
    }
    // 状態の更新
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
