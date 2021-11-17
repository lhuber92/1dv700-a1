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
    if (algorithm === 'caesarCipher') {
      caesarCipherEncryption()
    } else {
      leoCipherEncryption()
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
    const cipherAlphabet = createCipherAlphabet("4x18x22x23x15x13x24x10x5x7x21x26x11x1x17x2x3x6x8x9x12x14x16x19x20x25x")
    const plainText = "WE ARE DISCOVERED FLEE AT ONCE"
    let cypherText = ""
  
    for (let i = 0; i < plainText.length; i++) {
      cypherText = cypherText + encryptCharacter(plainText[i], cipherAlphabet) 
    }

    console.log(cypherText)
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
    else if (character === "b" || character === "B") { return cipherAlphabet[1] }
    else if (character === "c" || character === "C") { return cipherAlphabet[2] }
    else if (character === "d" || character === "D") { return cipherAlphabet[3] }
    else if (character === "e" || character === "E") { return cipherAlphabet[4] }
    else if (character === "f" || character === "F") { return cipherAlphabet[5] }
    else if (character === "g" || character === "G") { return cipherAlphabet[6] }
    else if (character === "h" || character === "H") { return cipherAlphabet[7] }
    else if (character === "i" || character === "I") { return cipherAlphabet[8] }
    else if (character === "j" || character === "J") { return cipherAlphabet[9] }
    else if (character === "k" || character === "K") { return cipherAlphabet[10] }
    else if (character === "l" || character === "L") { return cipherAlphabet[11] }
    else if (character === "m" || character === "M") { return cipherAlphabet[12] }
    else if (character === "n" || character === "N") { return cipherAlphabet[13] }
    else if (character === "o" || character === "O") { return cipherAlphabet[14] }
    else if (character === "p" || character === "P") { return cipherAlphabet[15] }
    else if (character === "q" || character === "Q") { return cipherAlphabet[16] }
    else if (character === "r" || character === "R") { return cipherAlphabet[17] }
    else if (character === "s" || character === "S") { return cipherAlphabet[18] }
    else if (character === "t" || character === "T") { return cipherAlphabet[19] }
    else if (character === "u" || character === "u") { return cipherAlphabet[20] }
    else if (character === "v" || character === "V") { return cipherAlphabet[21] }
    else if (character === "w" || character === "W") { return cipherAlphabet[22] }
    else if (character === "x" || character === "X") { return cipherAlphabet[23] }
    else if (character === "y" || character === "Y") { return cipherAlphabet[24] }
    else if (character === "z" || character === "Z") { return cipherAlphabet[25] }
    else { return character}
  }

  const caesarCipherEncryption = function () {
    console.log('caesar')
  }

  useEffect(() => {
    if (!input) {
      setDownloadLink(false)
    }
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
