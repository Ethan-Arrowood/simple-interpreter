class Token {
  constructor (type, value) {
    this.type = type
    this.value = value
  }
}

const TokenTypes = {
  LETTER: 'letter',
  DIGIT: 'digit',
  SYMBOL: 'symbol',
  EQUAL: '=',
  SEMICOLON: ';',
  COLON: ':',
  COMMA: ',',
  LPAREN: '(',
  RPAREN: ')',
  LBRACK: '[',
  RBRACK: ']',
  LCURLY: '{',
  RCURLY: '}'
}

function lexer (str) {
  
}

function isLetter (c) {
  return ( c >= 'A' && c <= 'Z' ) |
         ( c >= 'A' && c <= 'a' )
}

function isDigit (c) {
  return ( c >= '0' && c <= '9' )
}

function isSymbol (c) {
  return (
    c === '[' |
    c === ']' |
    c === '{' |
    c === '}' |
    c === '(' |
    c === ')' |
    c === '<' |
    c === '>' |
    c === "'" |
    c === '"' |
    c === '=' |
    c === '|' |
    c === '.' |
    c === ',' |
    c === ';'
  )
}