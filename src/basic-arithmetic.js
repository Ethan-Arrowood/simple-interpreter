class Token {
  constructor (type, value) {
    this.type = type
    this.value = value
  }

  static types = {
    PLUS: Symbol('PLUS'),
    MINUS: Symbol('MINUS'),
    MUL: Symbol('MUL'),
    DIV: Symbol('DIV'),
    INTEGER: Symbol('INTEGER'),
    EOF: Symbol('EOF')
  }
}

function isDigit (c) {
	return c >= '0' && c <= '9'
}

function isSpace (c) {
	return c === ' '
}

function scan (input) {
  let pos = 0
  let char
  const tokens = []

  while (pos !== input.length) {
    char = input[pos]
    switch (char) {
      case '+':
        tokens.push(new Token(Token.types.PLUS, '+'))
        break
      case '-':
        tokens.push(new Token(Token.types.MINUS, '-'))
        break
      case '*':
        tokens.push(new Token(Token.types.MUL, '*'))
        break
      case '/':
        tokens.push(new Token(Token.types.DIV, '/'))
        break
      default:
        if (isDigit(char)) {
          let integer = char
          while (pos !== input.length && isDigit(input[pos + 1])) {
            integer += input[pos + 1]
            pos++
          }
          tokens.push(new Token(Token.types.INTEGER, integer))
          break
        } else if (char === ' ') {
          break
        } else {
          throw Error(`Found unexpected character ${char} at position ${pos}`)
        }
    }
    pos++
  }

  tokens.push(new Token(Token.types.EOF, null))

  return tokens
}

function parse (tokens) {
  expr()

  function expr () {
    
  }

  function term () {

  }

  function factor () {

  }
}

function interpret (input) {
  const tokens = scan(input)
  const result = parse(tokens)
  return result
}

console.log(scan('10 + 2 - 4'))