import './App.css';
import React, { useState } from "react"
import TextField from '@material-ui/core/TextField';
import { withStyles  } from '@material-ui/core/styles';
import "@fontsource/plus-jakarta-sans"; // Defaults to weight 400.
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import colors from './config/colors';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import html2canvas from 'html2canvas';
import Tokenizer from './tokenizer/module/Tokenizer.js'
import Grammar from "./tokenizer/module/Grammar.js";
import WordRule from "./tokenizer/module/grammarRules/WordRule.js"
import DotRule from "./tokenizer/module/grammarRules/DotRule.js"


// Inspiration form slider found here:
// https://material-ui.com/components/slider/

// Inspiration for html2Canvas found here
// https://stackoverflow.com/questions/31656689/how-to-save-img-to-users-local-computer-using-html2canvas

// Inspiration for checkbox found here
// https://material-ui.com/components/checkboxes/

// Inspiration for textfield found here
// https://material-ui.com/components/text-fields/

// Custom colors of the input when active
const CustomTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: colors.primary,
    },
    '& label.Mui-focused input': {
      color: colors.primary,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: colors.primary,
    },
  },
})(TextField);

function App() {
  const [input, setInput] = useState(false)
  const [checked, setChecked] = useState(false)
  const [outputTextClassName, setOutputTextClassName] = useState("")
  const [outputContainerClassName, setOutputContainerClassName] = useState("outputContainer")
  const WordAndDotGrammar = new Grammar([new DotRule(), new WordRule()])
  const tokenInput = "a"
  const tokenizer = new Tokenizer(WordAndDotGrammar, tokenInput)
  const result = tokenizer.getActiveToken()
  console.log('---')
  console.log(result)
  console.log('---')

  const handleInput = function (inputString) {
    setInput(inputString)
  }

  const handleSwitchChange = function (event) {
    setChecked(event.target.checked)
    if (event.target.checked) {
      setOutputTextClassName("uppercase")
    } else {
      setOutputTextClassName("nonUppercase")
    }
  }

  const handleSliderChange = function (event, newValue) {
    if (newValue === 0) {
      setOutputContainerClassName("outputContainer rotation0")
    } else if (newValue === 33) {
      setOutputContainerClassName("outputContainer rotation90")
    } else if (newValue === 66) {
      setOutputContainerClassName("outputContainer rotation180")
    } else {
      setOutputContainerClassName("outputContainer rotation270")
    }
  }

  function startDownload(uri, filename) {
    const link = document.createElement('a');
    if (typeof link.download === 'string') {
        link.href = uri;
        link.download = filename;

        //Firefox requires the link to be in the body
        document.body.appendChild(link);

        //simulate click
        link.click();

        //remove the link when done
        document.body.removeChild(link);
    } else {
        window.open(uri);
    }
}

  const saveImage = function () {
    html2canvas(document.querySelector("#capture")).then(canvas => {
      startDownload(canvas.toDataURL(), 'name2image.png');
    });
  }

  function valueLabelFormat(value) {
    // Find the current mark
    const currentMarkIndex = marks.findIndex((mark) => mark.value === value);

    // Get the label of the current mark
    return marks[currentMarkIndex].label
  }

  const marks = [
    {
      value: 0,
      label: '0°',
    },
    {
      value: 33,
      label: '90°',
    },
    {
      value: 66,
      label: '180°',
    },
    {
      value: 100,
      label: '270°',
    },
  ];

  return (
    <div className="App">
      <main>
        <header>
          Name2Image
        </header>
        <form noValidate autoComplete="off">
          <CustomTextField onChange={(event) => handleInput(event.target.value)} label="Enter your name" inputProps={{ maxLength: 10 }} />
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
            label="Capitalize letters?"
          />
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <RotateRightIcon />
          </Grid>
          <Grid item xs>
            <Slider
              onChange={handleSliderChange}
              defaultValue={0}
              valueLabelFormat={valueLabelFormat}
              aria-labelledby="discrete-slider-restrict"
              step={null}
              valueLabelDisplay="auto"
              marks={marks}
            />
          </Grid>
        </Grid>
        </FormGroup>
        {input && (
          <>
            <div id="capture">
              <div className={outputContainerClassName}>
                <p className={outputTextClassName}>{input}</p>
              </div>
            </div>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
                onClick={() => { saveImage() }}
              >
                Save
              </Button>
            </>
        )}
      </main>
    </div>
  );
}

export default App;
