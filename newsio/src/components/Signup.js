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
import { signup } from '../api/authentication.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Alert } from '@mui/material';

const theme = createTheme();

export default function SignUp() {

  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = useState('');
  const [formFieldErrors, setFormFieldErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let allFieldsFilledOut = true;
    const newFormFieldErrors = {
      firstName: false,
      lastName: false,
      email: false,
      password: false
    };
    for (const fieldName in formFieldErrors) {
      if (data.get(fieldName) === '') {
        setAlertMessage('Please fill in all fields');
        newFormFieldErrors[fieldName] = true;
        allFieldsFilledOut = false;
      }
    }
    setFormFieldErrors(newFormFieldErrors);
    if (!allFieldsFilledOut) {
      return
    }
    signup(
      data.get('firstName'),
      data.get('lastName'),
      data.get('email'),
      data.get('password')
    )
      .then((response) => {
        if (response.status === 409) {
          setAlertMessage('There is already an account with that email. Please log in or use a different email.');
          throw new Error();
        }
        if (!response.ok) {
          setAlertMessage('Unable to register user');
          throw new Error();
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem('token', data.token);
        navigate('/search');
      })
      .catch(() => {
        console.error('Unable to register user');
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={formFieldErrors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={formFieldErrors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={formFieldErrors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={formFieldErrors.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">
                  <Typography variant="body2">Already have an account? Log in</Typography>
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