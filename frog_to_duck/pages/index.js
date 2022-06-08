import Head from 'next/head'
import * as React from 'react'
import Button from '@mui/material/Button'
import { CssBaseline, requirePropFactory } from '@mui/material'
import { ThemeProvider, createTheme } from "@mui/material/styles"
import Grid from '@mui/material/Grid'
import { Box } from '@mui/system'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Image from 'next/image'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


// Char by char ASCII to Text Helper
function a2th(asciiInput) {
  return String.fromCharCode(asciiInput);
}

// Char by char Text to ASCII Helper
function t2ah(textInput) {
  return textInput.charCodeAt();
}



// ASCII to Text
function a2tf(asciiInput) {
  asciiInput = asciiInput.split(" ")
  var returnText = "";
  for (var i = 0; i < asciiInput.length; i++) {
    returnText = returnText + a2th(asciiInput[i])
  }
  return returnText
}



// Text to ASCII
function t2af(textInput) {
  textInput = textInput.split("")
  var returnText = "";
  for (var i = 0; i < textInput.length; i++) {
    var bina = parseInt(t2ah(textInput[i])).toString()
    returnText = returnText + bina + " ";
  }
  returnText = returnText.slice(0,-1)
  return returnText;
}




// Binary to Text
function b2tf(binaryInput) {
  binaryInput = binaryInput.split(" ")
  var returnText = "";
  for (var i = 0; i < binaryInput.length; i++) {
    var deci = parseInt(binaryInput[i], 2)
    returnText = returnText + a2th(deci)
  }
  return returnText
}





// Text to Binary
function t2bf(textInput) {
  textInput = textInput.split("")
  var returnText = "";
  for (var i = 0; i < textInput.length; i++) {
    var bina = parseInt(t2ah(textInput[i])).toString(2).padStart(8, "0")
    returnText = returnText + bina + " ";
  }
  returnText = returnText.slice(0,-1)
  return returnText;
}



// Hex to Text
function h2tf(hexInput) {
  hexInput = hexInput.split(" ")
  var returnText = "";
  for (var i = 0; i < hexInput.length; i++) {
    var deci = parseInt(hexInput[i], 16)
    returnText = returnText + a2th(deci)
  }
  return returnText
}





// Text to Hex
function t2hf(textInput) {
  textInput = textInput.split("")
  var returnText = "";
  for (var i = 0; i < textInput.length; i++) {
    var bina = parseInt(t2ah(textInput[i])).toString(16)
    returnText = returnText + bina + " ";
  }
  returnText = returnText.slice(0,-1)
  return returnText;
}


// Nochange function for default
function noChange(textInput) {
  return textInput
}





const translations = [
  {
    value: "B2T",
    label: "Binary to Text"
  },
  {
    value: "T2B",
    label: "Text to Binary"
  },
  {
    value: "H2T",
    label: "Hex to Text"
  },
  {
    value: "T2H",
    label: "Text to Hex"
  },
  {
    value: "A2T",
    label: "ASCII to Text"
  },
  {
    value: "T2A",
    label: "Text to ASCII"
  },
  {
    value: "M2T",
    label: "Morse to Text"
  },
  {
    value: "T2M",
    label: "Text to Morse"
  }
]





const frogBg = createTheme({
  palette: {
    background: {
      default: "#e4f0e2"
    }
  }
})


const buttonTheme = createTheme({
  palette: {
    duck: {
      main: "#dec400",
      contrastText: '#000'
    },
    frog: {
      main: "#1e7022",
      contrastText: '#FFF'
    }
  }
})





export default function Home() {

  // States
  const [bgColor, setBgColor] = React.useState(frogBg)
  const [translation, setTranslation] = React.useState('B2T')
  var   [t, setTranslate] = React.useState("")
  const [open, setOpen] = React.useState(false);




  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  // inner functions
  const handleChange = e => {
    setTranslation(e.target.value)
    // console.log(translation)
  }

  // Async await
  React.useEffect(() => {
    setTranslate(translate(document.getElementById("outlined-multiline-input").value))
  },[translation])

  // statechange
  const handleTranslate = (value) => {
    setTranslate(translate(value))
  }




  // Add the codes to the list to test
  function translate(textInput) {

    var returnOutput
    switch(translation) {
      case "B2T":
        returnOutput = b2tf(textInput)
        break
      case "T2B":
        returnOutput = t2bf(textInput)
        break
      case "A2T":
        returnOutput = a2tf(textInput)
        break
      case "T2A":
        returnOutput = t2af(textInput)
        break
      case "H2T":
        returnOutput = h2tf(textInput)
        break
      case "T2H":
        returnOutput = t2hf(textInput)
        break
      default:
        returnOutput = noChange(textInput)       
    }
    console.log(returnOutput)

    return returnOutput
  }


  // DO NOT TOUCH
  return (
    <ThemeProvider theme={bgColor}>
      <CssBaseline/>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Grid container>
          {/* SIDE BAR MENU */}
          <Grid item xs={3}>
            <div class="menu">
              <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent:"center", alignContent: 'space-between', height: "100%"}}>
                <Box sx={{display: 'flex', justifyContent: 'center', height: "auto"}}>
                  <Box component="form" 
                    sx={{'& .MuiTextField-root': {mt: 0, width: '23vw'}}}
                    noValidate
                    autoComplete='off'
                  >
                    <div>
                      <TextField
                        id="outlined-select-translations"
                        select
                        label="Translate"
                        value={translation}
                        onChange={handleChange}
                        // helperText="Please choose one of the methods"  
                      >
                        {translations.map((option) => (
                          <MenuItem id="translation-option" className={option.value} key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </Box>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                  <Image src="/dric.jpg" width="500px" height="500px"></Image>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                  <Box sx={{'& .MuiButton-root': {mt: 0, width: '23vw'}}}>
                    <Button variant="contained" disableElevation onClick={handleClickOpen}>
                      Instructions
                    </Button>
                    <BootstrapDialog
                      onClose={handleClose}
                      aria-labelledby="customized-dialog-title"
                      open={open}
                    >
                      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Instructions (Click anywhere outside the dialog to leave)
                      </BootstrapDialogTitle>
                      <DialogContent dividers>
                        <Typography gutterBottom>
                          <b>Translation options: </b>Please see the dropdown above and choose the translation.
                        </Typography>
                        <Typography gutterBottom>
                          <b>Input:</b> Please paste the encrypted string in "Input your Frog". The translator should run automatically.
                        </Typography>
                        <Typography gutterBottom>
                          <b>Output: </b>
                          Please see the decryped string cured from encryption. 
                        </Typography>
                      </DialogContent>
                    </BootstrapDialog>
                  </Box>
                </Box>
              </Box>
            </div>
          </Grid>

          {/* I/O STUFF */}
          <Grid item xs={9}>
            <div class="menu frogbg">
              <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent:"center", alignContent: 'space-between', height: "100%"}}>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                  <Box component="form"
                    sx={{'& .MuiTextField-root': { width: '70vw'}}}
                    noValidate
                    autoComplete="off" 
                  >
                    <div>
                      <TextField
                        id="outlined-multiline-input"
                        label="Input your Frog"
                        multiline
                        fullWidth
                        rows={8}
                        onChange={e => handleTranslate(e.target.value)}  
                      >
                      </TextField>
                    </div>
                  </Box>
                </Box>
                
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                  <Box component="form"
                    sx={{'& .MuiTextField-root': {width: '70vw'}}} 
                    noValidate
                    autoComplete="off" 
                  >
                    <div>
                      <TextField
                        id="outlined-multiline-output"
                        label="Out comes your Duck"
                        multiline
                        disabled
                        rows={8}
                        value={t}
                      >
                        {t}
                      </TextField>
                    </div>
                  </Box>
                </Box>
              </Box>
            </div>
            
          </Grid>
        </Grid>
      </main>
    </ThemeProvider>
    
  )
}
