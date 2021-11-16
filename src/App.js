import './App.css';
import React, { useState } from "react"
import "@fontsource/plus-jakarta-sans"; // Defaults to weight 400.
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

function App() {
  const [input, setInput] = useState(false)
  const [checked, setChecked] = useState(false)
  const [algorithm, setAlgorithm] = React.useState('caesarCipher');
  const [switchLabel, setSwitchLabel] = React.useState('Encryption')

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

  const handleFileChange = function (event) {
    console.log(event.target.value)
  }

  const submit = async function () {
    if (algorithm === 'caesarCipher') {
      caesarCipherEncryption()
    } else {
      leoCipherEncryption()
    }
    
  }

  const leoCipherEncryption = function () {
    console.log('leo')
  }

  const caesarCipherEncryption = function () {
    console.log('caesar')
  }

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
                <MenuItem value={'caesarCipher'}>Caesar Cipher</MenuItem>
                <MenuItem value={'leoCipher'}>Leo Cipher</MenuItem>
              </Select>
            </FormControl>
            <div className="inputField">
            <input 
              type="file" 
              onChange={handleFileChange}
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
            <div>
              <p>{input}</p>
            </div>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ArrowForwardIcon />}
              onClick={() => { submit() }}
            >
              Submit
            </Button>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
