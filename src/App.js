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

  const handleInput = function (inputString) {
    setInput(inputString)
  }

  const handleSwitchChange = function (event) {
    setChecked(event.target.checked)
    if (event.target.checked) {
      console.log('1')
    } else {
      console.log('2')
    }
  }

  const handleSelectChange = function (event) {
    console.log(event.target.value)
    setAlgorithm(event.target.value)
  }

  const submit = function () {
    console.log('pressed')
  }

  return (
    <div className="App">
      <main>
        <header>
          Boilerplate
        </header>
        <form noValidate autoComplete="off">
          <div className="inputField">
            <TextField onChange={(event) => handleInput(event.target.value)} label="Enter your name" inputProps={{ maxLength: 10 }} />
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
            label="Switch"
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
