import Token from './Token.js'
// Inspiration for multiple whitespaces conversion found here:
// https://stackoverflow.com/questions/3286874/remove-all-multiple-spaces-in-javascript-and-replace-with-single-space/3286892

// Inspiration for trimming of trailing / leading spaces found here:
// https://stackoverflow.com/questions/1172206/how-to-check-if-a-text-is-all-white-space-characters-in-client-side/1173854

// Inspiration for string splitting found here
// https://medium.com/@shemar.gordon32/how-to-split-and-keep-the-delimiter-s-d433fb697c65

export default class Tokenizer {
   constructor (grammar, inputString) {
    this._grammar = grammar
    this._inputString = this._formatString(inputString, grammar.arithmeticDividers)
    this._stringElements = this._splitStringIntoElements()
    this._activeStringElementIndex = 0
   }

   // Formats the string, preparing it to be split into elements later on.
   _formatString(inputString, arithmeticDividers) {
    let formattedString = inputString

    // If custom characters are provided that will be used for adding a space between 2 numbers.
    // Example if one of the arithmeticDividers is "%":
    // 5%2 becomes 5 % 2
    if (arithmeticDividers) {
      for (let i = 0; i < arithmeticDividers.length; i++) {
        const regex = new RegExp(`[${arithmeticDividers[i]}]`, 'g')
        formattedString = formattedString.replace(regex, ` ${arithmeticDividers[i]} `)
      }
    } else {
      // Adds a whitespace around common arithmetic operators.
      // Example "1+2" becomes "1 + 2". 
      formattedString = formattedString.replace(/[+]/g, ' + ')
      formattedString = formattedString.replace(/[-]/g, ' - ')
      formattedString = formattedString.replace(/[*]/g, ' * ')
      formattedString = formattedString.replace(/[/]/g, ' / ')
    }

    // Replaces multiple whitespaces with single whitespaces
    formattedString = formattedString.replace(/\s+/g,' ')

    // Remove any leading / trailing whitespaces
    formattedString = formattedString.trim()

    return formattedString
   }

   _splitStringIntoElements() {
    const inputElements = this._inputString.split(' ')
    const outputElements = [] // The array we'll later use when creating tokens from elements.

    // If the element includes a dot then its parts seperated by the dot will be split
    // into a new array. The dot will also become an element of the new array.
    // Every new element of this array will then be pushed to the output array.
    // Example: [a.2] will become, [a, .,  2]
    //
    // If the element is a number we won't split.
    // Example: [3.14] will still be [3.14] and the whole element
    // will be pushed to the output array.
    for (let i = 0; i < inputElements.length; i++) {
      if (inputElements[i].includes('.') && !Number(inputElements[i])) {
        const newArray = inputElements[i].split(/(?=[.])|(?<=[.])/g) // Split element by dot and keep the dot seperator.
        for (let i = 0; i < newArray.length; i++) {
          outputElements.push(newArray[i]) // Insert every element of the new array into the output array.
        }
      } else { // If no splitting of the element was needed then just insert it into the output array.
        outputElements.push(inputElements[i]) 
      }
    }
    return outputElements
   }

   getActiveToken() {
    if (
      this._activeStringElementIndex === this._stringElements.length || // If it's a position 1 after the last element
      this._inputString === '' // If the tokenizer got an empty string.
    ) {
      return new Token('END', '')
    } else { // Create and return a token from the element
      return this._grammar.createToken(this._stringElements[this._activeStringElementIndex])
    }
   }

   getNextToken() {
     this._activeStringElementIndex++
     return this.getActiveToken()
   }

   getPreviousToken() {
    this._activeStringElementIndex--
    return this.getActiveToken()
  }
 }