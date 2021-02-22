const INTEGER = 'INTEGER',
	PLUS = 'PLUS', MINUS = 'MINUS',
	EOF = 'EOF'

class Token {
	constructor (type, value) {
		this.type = type
		this.value = value
	}

	toString () {
		return `Token(${this.type} ${this.value})`
	}
}

class Interpreter {
	constructor (text) {
		this.text = text
		this.pos = 0
		this.currentToken = null
		this.currentChar = this.text[this.pos]
	}

	error () {
		throw new Error('Error parsing input')
	}

	advance () {
		this.pos++
		if (this.pos > this.text.length - 1) {
			this.currentChar = null
		} else {
			this.currentChar = this.text[this.pos]
		}
	}

	skipWhitespace () {
		while (this.currentChar !== null && isSpace(this.currentChar)) {
			this.advance()
		}
	}
	
	integer () {
		let result = ''
		while (this.currentChar !== null && isDigit(this.currentChar)) {
			result += this.currentChar
			this.advance()
		}

		return parseInt(result, 10)
	}

	getNextToken () {
		while (this.currentChar !== null) {
			if (isSpace(this.currentChar)) {
				this.skipWhitespace()
				continue
			}
			if (isDigit(this.currentChar)) {
				return new Token(INTEGER, this.integer())
			}
			if (this.currentChar === '+') {
				this.advance()
				return new Token(PLUS, '+')
			}
			if (this.currentChar === '-') {
				this.advance()
				return new Token(MINUS, '-')
			}
			this.error()
		}

		return new Token(EOF, null)
	}

	eat (tokenType) {
		if (this.currentToken.type === tokenType) {
			this.currentToken = this.getNextToken()
		} else {
			this.error()
		}
	}

	expr () {
		this.currentToken = this.getNextToken()
		const left = this.currentToken
		this.eat(INTEGER)
		const op = this.currentToken
		if (op.type === PLUS) {
			this.eat(PLUS)
		} else {
			this.eat(MINUS)
		}
		const right = this.currentToken
		this.eat(INTEGER)
		return op.type === PLUS ? left.value + right.value : left.value - right.value
	}
}

function isDigit (c) {
	return c >= '0' && c <= '9'
}

function isSpace (c) {
	return c === ' '
}

module.exports = Interpreter