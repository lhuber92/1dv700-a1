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
  const [key, setKey] = useState("4x18x22x23x15x13x24x10x5x7x21x26x11x1x17x2x3x6x8x9x12x14x16x19x20x25x")
  const [checked, setChecked] = useState(false)
  const [algorithm, setAlgorithm] = React.useState('caesarCipher')
  const [switchLabel, setSwitchLabel] = React.useState('Encryption')
  const [downloadLink, setDownloadLink] = React.useState(false)
  const [textToProcess, setTextToProcess] = React.useState(false)

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
    reader.readAsText(file);
  }

  const submit = async function () {
    console.log(switchLabel)
    if (algorithm === 'caesarCipher') {
      console.log('a')
      switchLabel === 'Encryption' ? caesarCipherEncryption() : caesarCipherDecryption()
    } else {
      console.log('b')
      switchLabel === 'Encryption' ? leoCipherEncryption() : leoCipherDecryption()
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

  const leoCipherEncryption = function () {
    console.log('leo encrypt')
    const cipherAlphabet = createCipherAlphabet(key)
    const plainText = "WE ARE DISCOVERED FLEE AT ONCE"
    let cypherText = ""
  
    for (let i = 0; i < plainText.length; i++) {
      cypherText = cypherText + encryptCharacter(plainText[i], cipherAlphabet) 
    }

    console.log(cipherAlphabet)
  }

  const createCipherAlphabet = function (key) {
    const cipherAlphabet = key.split("x")
    for (let i = 0; i < cipherAlphabet.length; i++) {
      cipherAlphabet[i] = Number(cipherAlphabet[i])
    }
    return cipherAlphabet
  }

  const encryptCharacter = function (character, cipherAlphabet) {
    if (character === "a" || character === "A") { return cipherAlphabet[0] }
    else if (character === "b" || character === "B") { return { plainCharacter: character, cipherCharacter: cipherAlphabet[1] }}
    else if (character === "c" || character === "C") { return { plainCharacter: character, cipherCharacter: cipherAlphabet[2] }}
    else if (character === "d" || character === "D") { return { plainCharacter: character, cipherCharacter: cipherAlphabet[3] }}
    else if (character === "e" || character === "E") { return { plainCharacter: character, cipherCharacter: cipherAlphabet[4] }}
    else if (character === "f" || character === "F") { return { plainCharacter: character, cipherCharacter: cipherAlphabet[5] }}
    else if (character === "g" || character === "G") { return { plainCharacter: character, cipherCharacter: cipherAlphabet[6] }}
    else if (character === "h" || character === "H") { return { plainCharacter: character, cipherCharacter: cipherAlphabet[7] }}
    else if (character === "i" || character === "I") { return { plainCharacter: character, cipherCharacter: cipherAlphabet[8] }}
    else if (character === "j" || character === "J") { return { plainCharacter: character, cipherCharacter: cipherAlphabet[9] }}
    else if (character === "k" || character === "K") { return { plainCharacter: character, cipherCharacter: cipherAlphabet[10] }}
    else if (character === "l" || character === "L") { return { plainCharacter: character, cipherCharacter: cipherAlphabet[11] }}
    else if (character === "m" || character === "M") { return { plainCharacter: character, cipherCharacter: cipherAlphabet[12] }}
    else if (character === "n" || character === "N") { return { plainCharacter: character, cipherCharacter: cipherAlphabet[13] }}
    else if (character === "o" || character === "O") { return { plainCharacter: character, cipherCharacter: cipherAlphabet[14] }}
    else if (character === "p" || character === "P") { return { plainCharacter: character, cipherCharacter: cipherAlphabet[15] }}
    else if (character === "q" || character === "Q") { return { plainCharacter: character, cipherCharacter: cipherAlphabet[16] }}
    else if (character === "r" || character === "R") { return { plainCharacter: character, cipherCharacter: cipherAlphabet[17] }}
    else if (character === "s" || character === "S") { return { plainCharacter: character, cipherCharacter: cipherAlphabet[18] }}
    else if (character === "t" || character === "T") { return { plainCharacter: character, cipherCharacter: cipherAlphabet[19] }}
    else if (character === "u" || character === "u") { return { plainCharacter: character, cipherCharacter: cipherAlphabet[20] }}
    else if (character === "v" || character === "V") { return { plainCharacter: character, cipherCharacter: cipherAlphabet[21] }}
    else if (character === "w" || character === "W") { return { plainCharacter: character, cipherCharacter: cipherAlphabet[22] }}
    else if (character === "x" || character === "X") { return { plainCharacter: character, cipherCharacter: cipherAlphabet[23] }}
    else if (character === "y" || character === "Y") { return { plainCharacter: character, cipherCharacter: cipherAlphabet[24] }}
    else if (character === "z" || character === "Z") { return { plainCharacter: character, cipherCharacter: cipherAlphabet[25] }}
    else { return character}
  }

  const leoCipherDecryption = function () {
    console.log('leo decrypt')
  }

  const caesarCipherEncryption = function () {
    console.log('caesar encrypt')
  }

  const caesarCipherDecryption = function () {
    console.log('caesar decrypt')
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
