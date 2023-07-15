import React, { useState } from 'react';
import {
  TextField,
  Box,
  Button,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  ThemeProvider,
  IconButton,
  Snackbar,
  Tooltip,
  Link,
} from '@mui/material';
import { DeleteOutline, HelpOutline } from '@mui/icons-material';
import { theme } from './theme';

interface UsernamesRequestBody {
  usernames: string[];
}

const App: React.FC = () => {
  const [usernames, setUsernames] = useState<string[]>(['']);
  const [gameList, setGameList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [helpOpen, setHelpOpen] = useState<boolean>(false);

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedUsernames = [...usernames];
    updatedUsernames[index] = event.target.value;
    setUsernames(updatedUsernames);
  };

  const handleAddInput = () => {
    setUsernames([...usernames, '']);
  };

  const handleRemoveInput = (index: number) => {
    if (usernames.length === 1) return;
    const updatedUsernames = [...usernames];
    updatedUsernames.splice(index, 1);
    setUsernames(updatedUsernames);
  };

  const handleSubmit = () => {
    setLoading(true);
    const requestBody: UsernamesRequestBody = { usernames };
    fetch('/games/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error occurred');
        }
      })
      .then((data: string[]) => {
        setGameList(data);
        setOpen(true);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setError(false);
  };

  const handleHelpOpen = () => {
    setHelpOpen(true);
  };

  const handleHelpClose = () => {
    setHelpOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bgcolor="#1a2027"
        color="#B2BAC2"
      >
        {usernames.map((username, index) => (
          <Box key={index} display="flex" alignItems="center">
            <TextField
              label={`Username ${index + 1}`}
              value={username}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(index, event)}
              style={{ marginBottom: '10px' }}
              InputLabelProps={{
                style: { color: '#B2BAC2' },
              }}
              InputProps={{
                style: { color: '#B2BAC2' },
              }}
            />
            {usernames.length > 1 && (
              <IconButton onClick={() => handleRemoveInput(index)}>
                <DeleteOutline />
              </IconButton>
            )}
          </Box>
        ))}
        <Button variant="contained" onClick={handleAddInput} style={{ marginTop: '10px' }}>
          Add Username
        </Button>
        <Button variant="contained" onClick={handleSubmit} style={{ marginTop: '10px' }}>
          Submit
        </Button>
        {loading && (
          <Box mt={4}>
            <CircularProgress />
          </Box>
        )}
        <Tooltip title="Help">
          <IconButton onClick={handleHelpOpen} style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <HelpOutline />
          </IconButton>
        </Tooltip>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ color: '#ffffff' }}>You All Own</DialogTitle>
        <DialogContent style={{ color: '#ffffff' }}>
          {gameList.map((gameName, index) => (
            <Typography key={index} variant="body1">
              {gameName}
            </Typography>
          ))}
        </DialogContent>
      </Dialog>

      <Dialog open={helpOpen} onClose={handleHelpClose}>
        <DialogTitle style={{ color: '#ffffff' }}>Not Working?</DialogTitle>
        <DialogContent style={{ color: '#ffffff' }}>
          <Typography variant="body1">
            Your username is the name that displays in the URL on your{' '}
            <Link href="https://steamcommunity.com/my/profile" underline="always" color="inherit">
              Steam Community Profile
            </Link>
            , and might be different than your displayed username. Your games must be set to public on Steam. You can
            change your Privacy Settings in{' '}
            <Link href="https://steamcommunity.com/my/edit/settings?snr=" underline="always" color="inherit">
              Profile Privacy Settings
            </Link>{' '}
          </Typography>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={error}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message={
          <React.Fragment>
            Unable to fetch games for one or more users {' '}
            <Tooltip title="Help">
              <IconButton onClick={handleHelpOpen} size="small">
                <HelpOutline fontSize="small" />
              </IconButton>
            </Tooltip>
          </React.Fragment>
        }
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      />
    </ThemeProvider>
  );
};

export default App;
