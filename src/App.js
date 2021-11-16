import './App.css';
import React, { useState } from "react"
import "@fontsource/plus-jakarta-sans"; // Defaults to weight 400.
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import SubmitIcon from '@material-ui/icons/ArrowForward';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function App() {
  const [input, setInput] = useState(false)
  const [checked, setChecked] = useState(false)

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
          <TextField onChange={(event) => handleInput(event.target.value)} label="Enter your name" inputProps={{ maxLength: 10 }} />
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
              startIcon={<SubmitIcon />}
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
