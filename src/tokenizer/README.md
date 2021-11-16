# Tokenizer

A simple tokenizer that takes an input-string and divides it into chunks with help of provided grammar rules and optional arithmetic dividers.

When a chunk is selected the tokenizer will convert it into a type of token for example a word, + sign or a number. What type of token it will become is determined by the grammar rules provided.

The examples are jest test cases.

## Grammar rules

A grammar is composed by rules.

A few common grammar rules are included in the module/grammarRules folder, but new rules can be created on the go when instantiating the tokenizer object.

Example with built in grammar rule for detecting words:
```
import Tokenizer from "../module/Tokenizer";
import WordRule from "../module/grammarRules/WordRule.js"
import DotRule from "../module/grammarRules/DotRule.js"

const WordAndDotGrammar = new Grammar([new DotRule(), new WordRule()])

test('TC1', () => { // Sequence []
  const input = "a"
  const tokenizer = new Tokenizer(WordAndDotGrammar, input)
  const result = tokenizer.getActiveToken()

  expect(result.value).toBe('a') 
  expect(result.type).toBe('WORD')
})
```

We would get the same result if we defined the rules used in the grammar on the go using new Rule('name, regexmatch'):

```
import Tokenizer from "../module/Tokenizer";

const WordAndDotGrammar = new Grammar([
  new Rule('WORD', /^[\w|åäöÅÄÖ]+/g),
  new Rule('DOT', /^\./)
  ])

test('TC1', () => { // Sequence []
  const input = "a"
  const tokenizer = new Tokenizer(WordAndDotGrammar, input)
  const result = tokenizer.getActiveToken()

  expect(result.value).toBe('a') 
  expect(result.type).toBe('WORD')
})
```

## Arimethic dividers

By default the tokenizer seperates two numbers with help of the following operators: +, -, * and /. If you want to use other seperators of numbers you can provide them in the
grammar.arithmeticDividers property as an array. Note that we also need to pass a custom rule to be able to parse the operator as a seperate chunk when using the tokenizer.

**Important: If you use custom arimethic dividers none of the default (+ - * /) dividers will be used, so you also need to provide a complete of all dividers that you want to use for dividing two numbers.**

Example with custom arimethic dividers:

```
test('TC19', () => { // Sequence [>]
  const input = "1%2+2"
  const grammar = new Grammar([new AdditionRule(), new Rule('MODULUS', /^[%]/)])
  grammar.arithmeticDividers = ['+', '%']
  const tokenizer = new Tokenizer(grammar, input)

  const result = tokenizer.getNextToken()

  expect(result.value).toBe('%')
  expect(result.type).toBe('MODULUS')
})
```