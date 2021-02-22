const INTEGER = 'INTEGER',
	PLUS = 'PLUS', MINUS = 'MINUS',
	MUL = 'MUL', DIV = 'DIV',
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

class Lexer {
	constructor (text) {
		this.text = text
		this.pos = 0
		this.currentChar = this.text[this.pos]
	}

	error () {
		throw new Error('Invalid character')
	}

	advance () {
		this.pos++
		if (this.pos > this.text.length -1) {
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
			if (this.currentChar === '*') {
				this.advance()
				return new Token(MUL, '*')
			}
			if (this.currentChar === '/') {
				this.advance()
				return new Token(DIV, '/')
			}
			this.error()
		}

		return new Token(EOF, null)
	}
}

class Interpreter {
	constructor (lexer) {
		this.lexer = lexer
		this.currentToken = this.lexer.getNextToken()
	}

	error () {
		throw new Error('Error parsing input')
	}

	eat (tokenType) {
		if (this.currentToken.type === tokenType) {
			this.currentToken = this.lexer.getNextToken()
		} else {
			this.error()
		}
	}

	factor () {
		const token = this.currentToken
		this.eat(INTEGER)
		return token.value
	}

	term () {
		let result = this.factor()

		while ([MUL, DIV].includes(this.currentToken.type)) {
			const token = this.currentToken
			if (token.type === MUL) {
				this.eat(MUL)
				result *= this.factor()
			} else if (token.type === DIV) {
				this.eat(DIV)
				result /= this.factor()
			}
		}

		return result
	}

	expr () {
		let result = this.term()

		while ([PLUS, MINUS].includes(this.currentToken.type)) {
			const token = this.currentToken
			if (token.type === PLUS) {
				this.eat(PLUS)
				result += this.term()
			} else if (token.type === MINUS) {
				this.eat(MINUS)
				result -= this.term()
			}
		}

		return result
	}
}

function isDigit (c) {
	return c >= '0' && c <= '9'
}

function isSpace (c) {
	return c === ' '
}

module.exports = { Lexer, Interpreter }