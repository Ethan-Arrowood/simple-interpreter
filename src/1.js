const INTEGER = 'INTEGER', PLUS = 'PLUS', EOF = 'EOF'

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
	}

	error () {
		throw new Error('Error parsing input')
	}

	getNextToken () {
		if ( this.pos > this.text.length - 1 ) {
			return new Token(EOF, null)
		}

		const currentChar = this.text[this.pos]
		if (isDigit(currentChar)) {
			this.pos++
			return new Token(INTEGER, parseInt(currentChar, 10))
		} else if (currentChar === '+') {
			this.pos++
			return new Token(PLUS, currentChar)
		}

		this.error()
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
		this.eat(PLUS)
		const right = this.currentToken
		this.eat(INTEGER)
		return left.value + right.value
	}
}

function isDigit (c) {
	return c >= '0' && c <= '9'
}

module.exports = Interpreter