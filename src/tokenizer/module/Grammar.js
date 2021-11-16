import Token from './Token.js'

export default class Grammar {
  constructor (grammarRules) {
    this._grammarRules = grammarRules
  }
  
  createToken(string) {
    if (!string) {
      throw new Error(`No string provided for token creation`)
    }
    
    for (let i = 0; i < this._grammarRules.length; i++) {
      if (string.match(this._grammarRules[i].regex)) {
        // Return the newly created token and exit the method.
        return new Token(this._grammarRules[i].name, string)
      }
    }

    // In case there were a string provided but no match to our grammar rules were found.
    throw new Error(`No lexical element matches ${string}`)
  }
}