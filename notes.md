# Notes

## Part 1

**Lexical analysis** is the process of breaking the input string into tokens.

The first step of the interpreter is to read the input of characters and convert them into a stream of tokens. This step is called the **lexical analyzer** or **lexer**. It is also known as a **scanner** or a **tokenizer**.

In part 1 [code](./src/1.js) the method `getNextToken` is the lexical analyzer.

1. What is an interpreter?

  An interpreter processes and executes the source code without translating it into machine code.

2. What is a compiler?

  A compiler translates source code into machine code.

3. What’s the difference between an interpreter and a compiler?

  A compiler does not execute the source program; it only translates it into machine language.

4. What is a token?

  A token is an object with a _type_ and _value_ that represents a source code character.

5. What is the name of the process that breaks input apart into tokens?

  Lexical Analysis

6. What is the part of the interpreter that does lexical analysis called?

  Lexer
   
7. What are the other common names for that part of an interpreter or a compiler?

  Scanner, tokenizer

## Part 2

A **Lexeme** is a sequence of characters that form a token.

| token | sample lexemes |
| - | - |
| INTEGER | 1, 9, 0, 17, 341 |
| PLUS | + |
| MINUS | - |

**Parsing** is the process of recognizing a phrase in the stream of tokens.

**Parser** is the part of an interpreter that performs the parsing job.

## Part 3

A **syntax diagram** is a graphical representation of a programming language's syntax rules.

```
        |----------------|
-`term`-|-|-`+`-|-`term`-|-->
          |-`-`-|        |
          |--------------|
```

In this instance, a `term` is just an integer.

Syntax diagrams serve two main purposes
1. Graphically represnt the specification (grammar) of a programming language
2. Can be used to help write the parser - the digram can be mapped directly to code.

Parsing is also called **syntax analysis**, and the parser is also called **syntax analyzer**

## Part 4

Another widely used notation for specifying the synax of a programming language is called **context-free grammars** (grammars for short) or **BNF** (Backus-Naur Form)

- Grammer specifies the syntax of a prog lang in a concise manner. Unlike snyax diagrams, grammars are compact.
- Grammar serves as great documentation
- Grammar is a good starting point for manually writing a parser from scratch. Often, the grammar can be converted directly to code
- Parser Generators can accept grammar and automatically generate a parser from it.

Grammar describing the arithmetic expression `7 * 4 / 2 * 3`

```
expr : factor ( ( MUL | DIV ) factor ) *
factor : INTEGER
```

Grammar consists of a sequence of **rules**, aka **productions**. The previous example has 2 rules (expr, factor).

A rule consists of a **non-terminal** called the **head** or **left-hand side** of the production and a sequence of **terminals** and/or **non-terminals** called the **body** or **right-hand side**.

In the previous example, tokens like `MUL`, `DIV` and `INTEGER` are **terminals**, and variables like `expr` and `factor` are **non-terminals**.

Some useful rules for translating grammar into code:
1. Each rule, `R`, defined in the grammar, becomes a method with the same name, and refernces to that rule become a method call: `R()`. The body of the method follows the flow of the body of the rule using the very same guidelines.
2. Alternatives `(a1 | a2 | aN)` become an `if-else` statement
3. An optional grouping `(...)*` becomes a `while` statement that can loop over zero or more times
4. Each token reference `T` becomes a call to the method `eat: eat(T)`. The way the _eat_ method works is that it consumes the token `T` if it matches the current _lookahead_ token, then it gets a new token from the lexer and assigns that token to the _currentToken_ internal variable.

## Part 5

Precedence table for arithmetic operators

| level | associativity | operators |
| - | - | - |
| 2 | left | +, - |
| 1 | left | *, / |

1. For each level of precedence define a non-terminal. The body shouuld contain arithmetic operators from that level and non-terminals for the next higher level of precedence
2. Create an additional non-terminal _factor_ for basic units of expression, integers. The general rule is if there are N levels of precedence, there will be N + 1 non-terminals in total.

```
expr : term ( ( PLUS | MINUS ) term ) *
term : factor ( ( MUL | DIV ) factor ) *
factor: INTEGER
```