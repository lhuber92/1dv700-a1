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
      routeCipherEncryption()
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

  const routeCipherEncryption = function () {
    const plainText = "WE ARE DISCOVERED FLEE AT ONCE"
    console.log('leo')
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
