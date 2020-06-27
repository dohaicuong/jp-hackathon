import { createMuiTheme } from '@material-ui/core'

const primary = '#26667a'
const secondary = '#ffa2a7'

export default createMuiTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
    error: {
      main: '#e8525b',
    },
    // background: {
    //   default: '#d7fcf7',
    // }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*': {
          'scrollbar-width': 'thin',
        },
        '*::-webkit-scrollbar': { width: 8, height: 4 },
        '::-webkit-scrollbar-thumb': {
          background: primary,
          borderRadius: 10,
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: primary,
        },
      },
    },
  }
})