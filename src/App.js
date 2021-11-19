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

function App() {
  const [input, setInput] = useState(false)
  // const [key, setKey] = useState("4x18x22x23x15x13x24x10x5x7x21x26x11x1x17x2x3x6x8x9x12x14x16x19x20x25x") // W = 16
  const [key, setKey] = useState(7) // W = 16
  const [checked, setChecked] = useState(false)
  const [algorithm, setAlgorithm] = React.useState('caesarCipher')
  const [switchLabel, setSwitchLabel] = React.useState('Encryption')
  const [downloadLink, setDownloadLink] = React.useState(false)
  const [textToProcess, setTextToProcess] = React.useState(false)
  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

  const handleInput = function (inputString) {
    setInput(inputString)
  }

  const handleSwitchChange = function (event) {
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
    const reader = new FileReader();
    reader.onload = function(){
      const text = reader.result;
      setTextToProcess(text);
    };
    if (file) {reader.readAsText(file);}
  }

  const submit = async function () {
    if (algorithm === 'caesarCipher') {
      const pairedAlphabet = createCaesarCipherAlphabet(key)
      switchLabel === 'Encryption' ? caesarCipherEncryption(pairedAlphabet) : caesarCipherDecryption(pairedAlphabet)
    } else {
      const pairedAlphabet = createLeoCipherAlphabet(key)
      switchLabel === 'Encryption' ? leoCipherEncryption(pairedAlphabet) : leoCipherDecryption(pairedAlphabet)
    }
    const data = new Blob([input], { type: 'text/plain' });
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

  const leoCipherEncryption = function (pairedAlphabet) {
    let cypherText = ""
    for (let i = 0; i < textToProcess.length; i++) {
      cypherText = cypherText + leoCipherEncryptCharacter(textToProcess[i], pairedAlphabet) 
    }
  }

  const leoCipherEncryptCharacter = function (plainCharacter, pairedAlphabet) {
    const plainCypherPair = pairedAlphabet.find(element => element.plainCharacter.toUpperCase() === plainCharacter || element.plainCharacter.toLowerCase() === plainCharacter)
    if (plainCypherPair) {
      return plainCypherPair.cipherCharacter
    } else {
      return plainCharacter
    }
  }

  const leoCipherDecryption = function (pairedAlphabet) {
    const cypherFragmentsToProcess = textToProcess.split("z")
    let plainText = ""

    for (let i = 0; i < cypherFragmentsToProcess.length; i++) {
      plainText = plainText + leoCipherDecryptCharacter(cypherFragmentsToProcess[i], pairedAlphabet) 
    }
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

  const caesarCipherEncryption = function (pairedAlphabet) {
    console.log(pairedAlphabet)
    let cypherText = ""
    for (let i = 0; i < textToProcess.length; i++) {
      cypherText = cypherText + encryptCharacter(textToProcess[i], pairedAlphabet) 
    }
    console.log(cypherText)
  }

  const caesarCipherDecryption = function () {
  }

  useEffect(() => {
    if (!input) {
      setDownloadLink(false)
    }
    // setKey(input)
  }, [input])

  return (
    <div className="App">
      <main>
        <header>
          cryptoFriend
        </header>
        <form noValidate autoComplete="off">
          <div className="inputField">
            <TextField multiline onChange={(event) => handleInput(event.target.value)} label="Paste your secret key" />
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
            <div className="inputField">
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
                onClick={() => { submit() }}
              >
                Start {switchLabel}
              </Button>
            </div>
            {downloadLink && (downloadLink)}
          </>
        )}
        
      </main>
    </div>
  );
}

export default App;
