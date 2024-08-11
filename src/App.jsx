import { useState } from "react";
import "./style.css";

export default function Board() {
  // 先手がデフォルトで “X” になるようにするためのstate（次に表示されるのがXかどうかを判断するための状態）
  const [xIsNext, setXIsNext] = useState(true);

  // 9つのマス目を配列でもつようにstateを作成
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    // すでにマス目に表記があれば何もしない（早期リターン）
    if (squares[i]) {
      return;
    }

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

function calculateWinner(squares) {
  // 勝ちになるマス目の２次元配列
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    // lines配列の中身をa,b,cに代入
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // 起点になるマス目に代入されている X or 0 を返却する
      return squares[a];
    }
  }
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
