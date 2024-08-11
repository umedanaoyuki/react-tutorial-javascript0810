import { useState } from "react";
import "./style.css";

export default function Board() {
  // 9つのマス目を配列でもつようにstateを作成
  const [squares, setSquares] = useState(Array[9].fill(null));

  function handleClick() {
    // squaresという状態を直接変更するのではなく、nextSquaresという新しい配列を作成する
    const nextSquares = squares.slice();
    // 1番目のマス目だけに「X」を代入
    nextSquares[0] = "X";
    setSquares(nextSquares);
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={handleClick} />
        <Square value={squares[1]} onSquareClick={handleClick} />
        <Square value={squares[2]} onSquareClick={handleClick} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={handleClick} />
        <Square value={squares[4]} onSquareClick={handleClick} />
        <Square value={squares[5]} onSquareClick={handleClick} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={handleClick} />
        <Square value={squares[7]} onSquareClick={handleClick} />
        <Square value={squares[8]} onSquareClick={handleClick} />
      </div>
    </>
  );
}

function Square({ value, onSquareClick }) {
  // const [value, setValue] = useState(null);

  // function handleClick() {
  //   setValue("X");
  // }

  return <button className="square">{value}</button>;
}
