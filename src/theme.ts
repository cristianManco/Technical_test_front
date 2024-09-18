import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#673ab7',
    },
    secondary: {
      main: '#ff4081', 
    },
    background: {
      default: '#607d8b',
    },
    text: {
      primary: '#000',
      secondary: '#555',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: '2.5rem',
      color: '#333',
    },
    h2: {
      fontWeight: 500,
      fontSize: '2rem',
      color: '#555',
    },
    body1: {
      fontSize: '1rem',
      color: '#666',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px', 
          padding: '10px 20px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '20px',
          borderRadius: '15px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme;
