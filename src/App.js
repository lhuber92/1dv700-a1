import './App.css';
import React, { useState, useEffect } from "react"
import "@fontsource/plus-jakarta-sans"; // Defaults to weight 400.
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

function App() {
  const [input, setInput] = useState(false)
  const [hashInput, setHashInput] = useState(false)
  // const [key, setKey] = useState("4x18x22x23x15x13x24x10x5x7x21x26x11x1x17x2x3x6x8x9x12x14x16x19x20x25x") // W = 16
  const [key, setKey] = useState(7) // W = 16
  const [checked, setChecked] = useState(false)
  const [algorithm, setAlgorithm] = React.useState('caesarCipher')
  const [switchLabel, setSwitchLabel] = React.useState('Encryption')
  const [downloadLink, setDownloadLink] = React.useState(false)
  const [textToProcess, setTextToProcess] = React.useState(false)
  const [hashStringsToProcess, setHashStringsToProcess] = React.useState(false)
  const [cryptoOutput, setCryptoOutput] = React.useState(false)
  const [hashOutput, setHashOutput] = React.useState(false)
  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  const [unsignedHashArray, setUnsignedHashArray] = React.useState(false)
  const [hashFileName, setHashFileName] = React.useState(false)

  const hashSubmit = async function (hashInput) {
    console.log(hashInput)
    console.log(unsignedHashArray)
    setHashOutput(generateHash(hashInput))
  }

  const hashTestSubmit = async function () {
    const hashes = []
    const collisions = []
    
    for (let i = 0; i < hashStringsToProcess.length; i++) {
      const hash = generateHash(hashStringsToProcess[i])
      if (hashes.includes(hash)) {
        collisions.push({hash: hash, string: hashStringsToProcess[i]})
      }
      hashes.push(hash)
    }
    console.log('--- Results of ' + hashFileName + '---')
    console.log('*** Hashes: ***')
    console.log(hashes)
    console.log('*** Collisions: ****')
    console.log(collisions)
    console.log('--------------------------------------')
  }

  // Inspiration found here:
  // https://en.wikipedia.org/wiki/Pearson_hashing
  const generateHash = function (message) {
    let hash = message.length % 256
    for (let i = 0; i < message.length; i++) {
      hash = unsignedHashArray[hash ^ message.charCodeAt(i)]
    }
    return hash
  }

  const handleCryptoInput = function (inputString) {
    setDownloadLink(false)
    setInput(inputString)
  }
  
  // More checking could be for a live implementation but it would also give more information on the key format for hackers.
  const validateInput = function (inputString) {
    if (algorithm === 'caesarCipher') {
      if (!isNumber(Number(inputString)) || Number(inputString > alphabet.length) || inputString < 0) {
        alert('Only non-negative numbers accepted that are not higher than the length of the alphabet.')
        return false
      }
    } else if (inputString.length !== 69) {
      alert('Key needs to be 69 character long.')
      return false
    }
    return true
  }
  
  // Inspiration found here
  // https://stackoverflow.com/questions/1303646/check-whether-variable-is-number-or-string-in-javascript
  const isNumber = function (number) { return !isNaN(parseFloat(number)) && !isNaN(number - 0) }

  const handleSwitchChange = function (event) {
    setDownloadLink(false)
    setChecked(event.target.checked)
    if (event.target.checked) {
      setSwitchLabel('Decryption')
    } else {
      setSwitchLabel('Encryption')
    }
  }

  const handleSelectChange = function (event) {
    setDownloadLink(false)
    setAlgorithm(event.target.value)
  }

  // Inspiration for file-reading found here:
  // https://stackoverflow.com/questions/14446447/how-to-read-a-local-text-file
  const handleFileChange = function (file) {
    setDownloadLink(false)
    const reader = new FileReader();
    reader.onload = function(){
      const text = reader.result;
      setTextToProcess(text);
    };
    if (file) {reader.readAsText(file);}
  }

  const handleHashFileChange = function (file) {
    const reader = new FileReader();
    reader.onload = function(){
      const text = reader.result;
      setHashStringsToProcess(text.match(/[^\r\n]+/g))
    };
    if (file) {
      reader.readAsText(file);
      setHashFileName(file.name)
    }
  }

  const cryptoSubmit = async function () {
    if (validateInput(input)) {
      let result
      if (algorithm === 'caesarCipher') {
        const pairedAlphabet = createCaesarCipherAlphabet(key)
        switchLabel === 'Encryption' ? result = encryptText(pairedAlphabet) : result = caesarCipherDecryption(pairedAlphabet)
      } else {
        const pairedAlphabet = createLeoCipherAlphabet(key)
        switchLabel === 'Encryption' ? result = encryptText(pairedAlphabet) : result = leoCipherDecryption(pairedAlphabet)
      }
      const data = new Blob([result], { type: 'text/plain' });
      const fileUrl = window.URL.createObjectURL(data);
      setDownloadLink(
          <a className="downloadLink" download href={fileUrl}>
            <Button
              className="downloadButton"
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<DownloadIcon />}
            >Download file</Button>
          </a>
      )
      setCryptoOutput(result)
    }
  }

  const encryptText = function (pairedAlphabet) {
    let cypherText = ""
    for (let i = 0; i < textToProcess.length; i++) {
      cypherText = cypherText + encryptCharacter(textToProcess[i], pairedAlphabet) 
    }
    return cypherText
  }

  const encryptCharacter = function (plainCharacter, pairedAlphabet) {
    const plainCypherPair = pairedAlphabet.find(element => element.plainCharacter.toUpperCase() === plainCharacter || element.plainCharacter.toLowerCase() === plainCharacter)
    if (plainCypherPair) {
      return plainCypherPair.cipherCharacter
    } else {
      return plainCharacter
    }
  }

  const createLeoCipherAlphabet = function (key) {
    const keyFragments = key.split("x")
    keyFragments.pop() // Remove last element ("")
    const pairedAlphabet = []
    for (let i = 0; i < keyFragments.length; i++) {
      pairedAlphabet.push({ plainCharacter: alphabet[i], cipherCharacter: `z${keyFragments[i]}` }) // To divide cipher characters when placed in a string
    }
    return pairedAlphabet
  }

  const createCaesarCipherAlphabet = function (key) {
    const pairedAlphabet = []
    const doubleAlphabet = alphabet.concat(alphabet).join('')
    const substitutedAlphabet = doubleAlphabet.substring(key, alphabet.length + key)

    for (let i = 0; i < substitutedAlphabet.length; i++) {
      pairedAlphabet.push({plainCharacter: alphabet[i], cipherCharacter: substitutedAlphabet[i]})
    }
    return pairedAlphabet
  }

  const leoCipherDecryption = function (pairedAlphabet) {
    const cypherFragmentsToProcess = textToProcess.split("z")
    let plainText = ""

    for (let i = 0; i < cypherFragmentsToProcess.length; i++) {
      plainText = plainText + leoCipherDecryptCharacter(cypherFragmentsToProcess[i], pairedAlphabet) 
    }
    return plainText
  }

  const leoCipherDecryptCharacter = function (cypherCharacter, pairedAlphabet) {
    let plainCypherPair = pairedAlphabet.find(element => element.cipherCharacter === `z${cypherCharacter}`)

    if (plainCypherPair) {
      return plainCypherPair.plainCharacter
    } else {
      // If the cypherCharacter is ending with a whitespace
      plainCypherPair = pairedAlphabet.find(element => `${element.cipherCharacter}` === `z${cypherCharacter.trim()}`)
      if (plainCypherPair) {
        return plainCypherPair.plainCharacter + ' '
      } else {
        return cypherCharacter
      }
    }
  }

  const caesarCipherDecryption = function (pairedAlphabet) {
    const cypherFragmentsToProcess = textToProcess.split('')
    console.log(cypherFragmentsToProcess)
    let plainText = ""

    for (let i = 0; i < cypherFragmentsToProcess.length; i++) {
      plainText = plainText + caesarCipherDecryptCharacter(cypherFragmentsToProcess[i], pairedAlphabet) 
    }
    return plainText
  }

  const caesarCipherDecryptCharacter = function (cypherCharacter, pairedAlphabet) {
    let plainCypherPair = pairedAlphabet.find(element => element.cipherCharacter === cypherCharacter)

    if (plainCypherPair) {
      return plainCypherPair.plainCharacter
    } else {
      return cypherCharacter
    }
  }

  const generateHashArray = function () {
    const tempArray = []
    for (let i = 0; i <= 255; i++) {
      tempArray.push(i)
    }

    // Shuffle inspiration found here:
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    let currentIndex = tempArray.length
    let randomIndex
  
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [tempArray[currentIndex], tempArray[randomIndex]] = [tempArray[randomIndex], tempArray[currentIndex]];
    }

    return tempArray
  }

  useEffect(() => {
    if (!input) {
      setDownloadLink(false)
    }
    if (!unsignedHashArray) {
      setUnsignedHashArray(generateHashArray())
    }
    // setKey(input)
  }, [input, unsignedHashArray])

  return (
    <div className="App">
      <main>
        <header>
          cryptoFriend
        </header>
        <Divider>
          <Chip label="HASHING" />
        </Divider>
        <div className="inputField">
          <TextField multiline onChange={(event) => setHashInput(event.target.value)} label="Paste text to be hashed" />
        </div>
        <div className="inputField fileInputField">
          <p className="hashFileLabel">Upload a test file below to hash multiple string</p>
          <input 
            name="hashFileInput"
            type="file" 
            onChange={(event) => handleHashFileChange(event.target.files[0])}
            accept=".txt"
          />
        </div>
        {hashStringsToProcess && (
          <div className="startButton">
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ArrowForwardIcon />}
              onClick={() => { hashTestSubmit(hashInput) }}
            >
              Test hashing
            </Button>
          </div>
        )}
        {hashInput && (
          <>
            <div className="startButton">
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<ArrowForwardIcon />}
                onClick={() => { hashSubmit(hashInput) }}
              >
                Start hashing
              </Button>
            </div>
            {downloadLink && (downloadLink)}
            {cryptoOutput && (
              <div className="outputArea">
                {cryptoOutput}
              </div>
            )}
          </>
        )}
        <div className="outputArea">{hashOutput}</div>
        <div className="cryptoDivider">
          <Divider>
            <Chip label="ENCRYPTION / DECRYPTION" />
          </Divider>
        </div>
        <form noValidate autoComplete="off">
          <div className="inputField">
            <TextField multiline onChange={(event) => handleCryptoInput(event.target.value)} label="Paste your secret key" />
          </div>
          <div className="inputField">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Algorithm</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={algorithm}
                label="Algorithm"
                onChange={handleSelectChange}
              >
                <MenuItem value={'caesarCipher'}>Caesar Cipher (substitution)</MenuItem>
                <MenuItem value={'leoCipher'}>Leo Cipher (transportation)</MenuItem>
              </Select>
            </FormControl>
            <div className="inputField fileInputField">
              <input 
                type="file" 
                onChange={(event) => handleFileChange(event.target.files[0])}
                accept=".txt"
              />
            </div>
          </div>
        </form>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={(event) => handleSwitchChange(event)}
                name="checkedB"
                color="primary"
              />
            }
            label={switchLabel}
          />
        </FormGroup>
        {input && (
          <>
            <div className="startButton">
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<ArrowForwardIcon />}
                onClick={() => { cryptoSubmit() }}
              >
                Start {switchLabel}
              </Button>
            </div>
            {downloadLink && (downloadLink)}
            {cryptoOutput && (
              <div className="outputArea">
                {cryptoOutput}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
