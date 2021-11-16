/**
 * Represents a token with a type and value. For example a word or number.
 */
export default class Token {
  constructor (type, value) {
    this.type = type
    this.value = value
  }
}