const readline = require('readline')

const Interpreter = require(`./${process.argv[2]}.js`)

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: 'calc> '
})


rl.prompt()

rl.on('line', line => {
	const input = line.trim()
	const interpreter = new Interpreter(input)
	const result = interpreter.expr()
	console.log(result)
	rl.prompt()
}).on('close', () => {
	process.exit(0)
})