import React from 'react'
import ReactDOM from 'react-dom'
import { useState } from 'react'
import './index.css'
import Board from './board'

const Game = () => {
	const [history, sethistory] = useState([
		{
			squares: Array(9).fill(null),
			selected: null,
		},
	])
	const [stepNumber, setstepNumber] = useState(0)
	const [xIsNext, setxIsNext] = useState(true)
	const [sortDir, setSortDir] = useState(true)
	const handleClick = (i) => {
		const localhistory = history.slice(0, stepNumber + 1)
		const current = localhistory[stepNumber]
		const squares = current.squares.slice()

		if (calculateWinner(squares) || squares[i]) {
			return
		}

		squares[i] = xIsNext ? 'X' : 'O'
		sethistory(
			localhistory.concat({
				squares: squares,
				selected: i,
			}),
		)
		setstepNumber(localhistory.length)
		setxIsNext(!xIsNext)
	}

	const jumpTo = (step) => {
		setstepNumber(step)
		setxIsNext(step % 2 === 0)
	}

	const renderhistory = history
	const current = history[stepNumber]
	const winner = calculateWinner(current.squares)

	const moves = renderhistory.map((step, move) => {
		const pos = step.selected

		const desc = move
			? 'Go to move #' +
			  move +
			  ' (' +
			  Math.floor(pos / 3) +
			  ' ,' +
			  (pos % 3) +
			  ')'
			: 'Go to game start'

		return (
			<li key={move}>
				<button
					className={move === stepNumber ? 'focus' : ''}
					onClick={() => {
						jumpTo(move)
					}}
				>
					{desc}
				</button>
			</li>
		)
	})

	let status
	let winBox
	if (winner) {
		status = 'Winner: ' + winner.win
		winBox = winner.winSquares
	} else if (stepNumber === 9 && winner == null) {
		status = '무승부.'
	} else {
		status = 'Next player: ' + (xIsNext ? 'X' : 'O')
	}

	const init = () => {
		sethistory([
			{
				squares: Array(9).fill(null),
				selected: null,
			},
		])
		setstepNumber(0)
		setxIsNext(true)
		setSortDir(true)
	}

	return (
		<div className="game">
			<div className="game-board">
				<Board
					squares={current.squares}
					onClick={(i) => handleClick(i)}
					winBox={winBox}
				/>
			</div>
			<div className="game-info">
				<div>{status}</div>
				<button className="tg_btn" onClick={() => setSortDir(!sortDir)}>
					{sortDir ? 'asc' : 'desc'}
				</button>
				<button className="init" onClick={() => init()}>
					Restart
				</button>
				<ol>{sortDir ? moves : moves.reverse()}</ol>
			</div>
		</div>
	)
}

const calculateWinner = (squares) => {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]

	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i]
		if (
			squares[a] &&
			squares[a] === squares[b] &&
			squares[a] === squares[c]
		) {
			return {
				win: squares[a],
				winSquares: lines[i],
			}
		}
	}
	return null
}

ReactDOM.render(<Game />, document.getElementById('root'))

export default Game
