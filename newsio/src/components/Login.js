import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from '@mui/material';
import { login } from 'api/authentication';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const emailEmpty = data.get('email') === '';
    const passwordEmpty = data.get('password') === '';
    if (emailEmpty || passwordEmpty) {
      setEmailError(emailEmpty);
      setPasswordError(passwordEmpty);
      setAlertMessage('Please fill in all fields');
      return;
    }
    setEmailError(false);
    setPasswordError(false);

    login(
      data.get('email'),
      data.get('password')
    )
      .then((response) => {
        if (response.status === 403) {
          setAlertMessage('Incorrect username or password');
        }
        if (!response.ok) {
          throw new Error();
        }
        setAlertMessage('');
        return response.json();
      })
      .then((data) => {
        localStorage.setItem('token', data.token);
        navigate('/search');
      })
      .catch(() => {
        console.error('Unable to log in user');        
      })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={emailError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={passwordError}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log in
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgot-password">
                  <Typography variant="body2">Forgot password?</Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup">
                    <Typography variant="body2">Need an account? Sign up</Typography>
                </Link>
              </Grid>
            </Grid>
            {!!alertMessage && <Alert severity="error" sx={{ mt: 2 }}>{alertMessage}</Alert>}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}