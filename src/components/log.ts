const dataStyle = ['color: #fff', 'border-radius: 2px', 'font-size: 10px'].join(';')

const lineStyle = ['color: #6699cc', 'border-radius: 2px', 'font-size: 8px'].join(';')

const _log = <T>(data: T, label?: string | null, line?: number | null, color?: string | null) => {
	const labelStyle = [
		'color: #fff',
		`background-color: ${color ? color : '#33cc33'}`,
		'padding: 2px 4px',
		'font-size: 12px'
	].join(';')

	console.group(`%c${label ? label : '*** LOG ***'}`, labelStyle)

	console.log(`%c${JSON.stringify(data, null, 2)}`, dataStyle)

	console.log(
		`%c${line ? `line number: ${line}  |` : ''}  typeof: ${
			Array.isArray(data) ? 'array' : typeof data
		} `,
		lineStyle
	)

	console.groupEnd()
}

export default _log
