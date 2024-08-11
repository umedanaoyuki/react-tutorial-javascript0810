import { useState } from "react";
import "./style.css";

export default function Game() {
  // 要素数が 1 の配列であり、その唯一の要素が 9 つの null が入った配列
  const [history, setHistory] = useState([Array(9).fill(null)]);

  // ユーザーが現在見ている現在のmove
  const [currentMove, setCurrentMove] = useState(0);

  // 現在の盤面
  const currentSquares = history[currentMove];

  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    // 履歴を書き換える（戻ったところまでの履歴までは保存して、その後の履歴は消す）
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // 過去の履歴に戻る
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  // 9つのマス目を配列でもつようにstateを作成
  // const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    // すでにマス目に表記があれば何もしない（早期リターン）
    // 勝者がいる場合(trueで返される)は早期リターン
    if (squares[i] || calculateWinner(squares)) {
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
    // setSquares(nextSquares), setXIsNext(!xIsNext) をまとめる
    onPlay(nextSquares);
    // 状態の更新
    // setSquares(nextSquares);
    // setXIsNext(!xIsNext);
  }

  // 勝者
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner:" + winner;
  } else {
    const next = xIsNext ? "X" : "0";
    status = "Next player: " + next;
  }

  return (
    <>
      <div className="status">{status}</div>
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

/**
 * 勝者を返す関数の作成
 */
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
  return;
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
