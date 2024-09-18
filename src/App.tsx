import React from 'react';
import CharacterList from './components/CharacterList';
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Typography, Box } from '@mui/material';
import theme from './theme';
import RefreshButton from './components/RefreshButton';
import { FaStar } from 'react-icons/fa'; 

const titleStyle = {
  animation: 'fadeIn 2s ease-out',
  fontSize: '3rem',
  color: '#673ab7',
  '@keyframes fadeIn': {
    '0%': { opacity: 0, transform: 'translateY(-26px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Box sx={{ my: 5, textAlign: 'center', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
            <Typography variant="h1" gutterBottom sx={titleStyle}>
              <FaStar /> Rick and Morty Characters <FaStar />
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Explore your favorite characters from Rick and Morty. Filter by name. <span role="img" aria-label="star">⭐</span>
            </Typography>
            <RefreshButton />
          </Box>
          <CharacterList />
        </Container>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
