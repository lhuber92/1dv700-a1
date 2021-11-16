export default class WordRule {
  constructor () {
    this.name = 'WORD'
    this.regex = /^[\w|åäöÅÄÖ]+/g
  }
}