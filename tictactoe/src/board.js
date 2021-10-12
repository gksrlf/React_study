import React from 'react'
import Square from './square'

const Board = (props) => {
	const renderSquare = (i) => {
		return (
			<Square
				key={i}
				value={props.squares[i]}
				onClick={() => props.onClick(i)}
				winbox={props.winBox && props.winBox.includes(i)}
			/>
		)
	}

	let size = 3
	return (
		<div className="board">
			{[...Array(size).keys()].map((_, row) => (
				<div key={row} className="board-row">
					{[...Array(size).keys()].map((_, col) =>
						renderSquare(row * size + col),
					)}
				</div>
			))}

			{/* <div className="board-row">
				{renderSquare(0)}
				{renderSquare(1)}
				{renderSquare(2)}
			</div>
			<div className="board-row">
				{renderSquare(3)}
				{renderSquare(4)}
				{renderSquare(5)}
			</div>
			<div className="board-row">
				{renderSquare(6)}
				{renderSquare(7)}
				{renderSquare(8)}
			</div> */}
		</div>
	)
}

export default Board
