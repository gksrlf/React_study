const Square = (props) => {
	let style = {
		backgroundColor: 'blue',
	}
	return (
		<button
			className="square"
			onClick={props.onClick}
			style={props.winbox ? style : null}
		>
			{props.value}
		</button>
	)
}

export default Square
