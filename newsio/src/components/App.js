import React, { useEffect } from 'react'
import '../App.css';
import NavigationBar from './NavigationBar';
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material';
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === '/') {
      navigate('/search');
    }
  })

  return (
    <>
      <NavigationBar/>
      <Container sx={{ mt: 2 }}>
        <Outlet/>
      </Container>
    </>
  );
}

export default App;
