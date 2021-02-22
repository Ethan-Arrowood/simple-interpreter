# Notes

## Part 1

**Lexical analysis** is the process of breaking the input string into tokens.

The first step of the interpreter is to read the input of characters and conver them into a stream of tokens. This step is called the **lexical analyzer** or **lexer**. It is also known as a **scanner** or a **tokenizer**.

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