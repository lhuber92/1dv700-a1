import Tokenizer from "../module/Tokenizer";
import Grammar from "../module/Grammar.js";
import AdditionRule from "../module/grammarRules/AdditionRule.js"
import DotRule from "../module/grammarRules/DotRule.js"
import MultiplicationRule from "../module/grammarRules/MultiplicationRule.js"
import NumberRule from "../module/grammarRules/NumberRule.js"
import WordRule from "../module/grammarRules/WordRule.js"
import Rule from "../module/Rule"

const WordAndDotGrammar = new Grammar([new DotRule(), new WordRule()])
const ArithmeticGrammar = new Grammar([new NumberRule(), new AdditionRule(), new MultiplicationRule()])

test('TC1', () => { // Sequence []
  const input = "a"
  const tokenizer = new Tokenizer(WordAndDotGrammar, input)
  const result = tokenizer.getActiveToken()

  expect(result.value).toBe('a') 
  expect(result.type).toBe('WORD')
})

test('TC2', () => { // Sequence [>]
  const input = "a aa"
  const tokenizer = new Tokenizer(WordAndDotGrammar, input)
  const result = tokenizer.getNextToken()

  expect(result.value).toBe('aa') 
  expect(result.type).toBe('WORD')
})

test('TC3', () => { // Sequence [>]
  const input = "a.b"
  const tokenizer = new Tokenizer(WordAndDotGrammar, input)
  const result = tokenizer.getNextToken()

  expect(result.value).toBe('.') 
  expect(result.type).toBe('DOT')
})

test('TC4', () => { // Sequence [>>]
  const input = "a.b"
  const tokenizer = new Tokenizer(WordAndDotGrammar, input)
  tokenizer.getNextToken()
  const result = tokenizer.getNextToken()

  expect(result.value).toBe('b') 
  expect(result.type).toBe('WORD')
})

test('TC5', () => { // Sequence [>>]
  const input = "aa. b"
  const tokenizer = new Tokenizer(WordAndDotGrammar, input)
  tokenizer.getNextToken()
  const result = tokenizer.getNextToken()
  
  expect(result.value).toBe('b') 
  expect(result.type).toBe('WORD')
})

test('TC6', () => { // Sequence [>><]
  const input = "a.b"
  const tokenizer = new Tokenizer(WordAndDotGrammar, input)
  tokenizer.getNextToken()
  tokenizer.getNextToken()
  const result = tokenizer.getPreviousToken()
  
  expect(result.value).toBe('.') 
  expect(result.type).toBe('DOT')
})

test('TC7', () => { // Sequence []
  const input = ""
  const tokenizer = new Tokenizer(WordAndDotGrammar, input)
  const result = tokenizer.getActiveToken()
  
  expect(result.value).toBe('') 
  expect(result.type).toBe('END')
})

test('TC8', () => { // Sequence []
  const input = " "
  const tokenizer = new Tokenizer(WordAndDotGrammar, input)
  const result = tokenizer.getActiveToken()
  
  expect(result.value).toBe('') 
  expect(result.type).toBe('END')
})

test('TC9', () => { // Sequence [>]
  const input = "a"
  const tokenizer = new Tokenizer(WordAndDotGrammar, input)
  const result = tokenizer.getNextToken()
  
  expect(result.value).toBe('') 
  expect(result.type).toBe('END')
})

test('TC10', () => { // Sequence [<]
  const input = "a"
  const tokenizer = new Tokenizer(WordAndDotGrammar, input)
  const result = () => tokenizer.getPreviousToken()

  expect(result).toThrow()
})

test('TC11', () => { // Sequence []
  const input = "!"
  const tokenizer = new Tokenizer(WordAndDotGrammar, input)
  const result = () => tokenizer.getActiveToken() 

  expect(result).toThrow()
})

test('TC12', () => { // Sequence []
  const input = "3"
  const tokenizer = new Tokenizer(ArithmeticGrammar, input)
  const result = tokenizer.getActiveToken()

  expect(result.value).toBe('3')
  expect(result.type).toBe('NUMBER')
})

test('TC13', () => { // Sequence []
  const input = "3.14"
  const tokenizer = new Tokenizer(ArithmeticGrammar, input)
  const result = tokenizer.getActiveToken()

  expect(result.value).toBe('3.14')
  expect(result.type).toBe('NUMBER')
})

test('TC14', () => { // Sequence [>>>]
  const input = "3 + 54 * 4"
  const tokenizer = new Tokenizer(ArithmeticGrammar, input)
  tokenizer.getNextToken()
  tokenizer.getNextToken()
  const result = tokenizer.getNextToken()

  expect(result.value).toBe('*')
  expect(result.type).toBe('MULTIPLICATION')
})

test('TC15', () => { // Sequence [>>>]
  const input = "3+5 # 4"
  const tokenizer = new Tokenizer(ArithmeticGrammar, input)
  tokenizer.getNextToken()
  tokenizer.getNextToken()
  const result = () => tokenizer.getNextToken()

  expect(result).toThrow()
})

test('TC16', () => { // Sequence [><>>>]
  const input = "3.0+54.1     + 4.2"
  const tokenizer = new Tokenizer(ArithmeticGrammar, input)
  tokenizer.getNextToken()
  tokenizer.getPreviousToken()
  tokenizer.getNextToken()
  tokenizer.getNextToken()
  const result = tokenizer.getNextToken()

  expect(result.value).toBe('+')
  expect(result.type).toBe('ADDITION')
})

test('TC17', () => { // Sequence [>]
  const input = "1+2"
  const grammar = new Grammar([new NumberRule(), new AdditionRule()])
  grammar.arithmeticDividers = []
  const tokenizer = new Tokenizer(grammar, input)

  const result = tokenizer.getNextToken()

  expect(result.value).toBe('')
  expect(result.type).toBe('END')
})

test('TC18', () => { // Sequence [>]
  const input = "1+2"
  const grammar = new Grammar([new NumberRule(), new AdditionRule()])
  grammar.arithmeticDividers = ['+']
  const tokenizer = new Tokenizer(grammar, input)

  const result = tokenizer.getNextToken()

  expect(result.value).toBe('+')
  expect(result.type).toBe('ADDITION')
})

test('TC19', () => { // Sequence [>]
  const input = "1%2+2"
  const grammar = new Grammar([new AdditionRule(), new Rule('MODULUS', /^[%]/)])
  grammar.arithmeticDividers = ['+', '%']
  const tokenizer = new Tokenizer(grammar, input)

  const result = tokenizer.getNextToken()

  expect(result.value).toBe('%')
  expect(result.type).toBe('MODULUS')
})

test('TC20', () => { // Sequence [>]
  const input = "1%2+2"
  const grammar = new Grammar([new AdditionRule()])
  grammar.arithmeticDividers = ['+', '%']
  const tokenizer = new Tokenizer(grammar, input)

  const result = () => tokenizer.getNextToken()

  expect(result).toThrow()
})