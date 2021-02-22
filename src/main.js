const readline = require('readline')

const N = process.argv[2]

const { Interpreter, Lexer } = require(`./${N}.js`)

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: 'calc> '
})


rl.prompt()

rl.on('line', line => {
	const input = line.trim()
	if (N < 4) {
		const interpreter = new Interpreter(input)
		const result = interpreter.expr()
		console.log(result)
	} else {
		const lexer = new Lexer(input)
		const interpreter = new Interpreter(lexer)
		const result = interpreter.expr()
		console.log(result)
	}
	rl.prompt()
}).on('close', () => {
	process.exit(0)
})