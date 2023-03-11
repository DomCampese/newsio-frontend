import React from 'react'
import '../App.css';
import NavigationBar from './NavigationBar';
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <NavigationBar/>
      <Outlet/>
    </>
  );
}

export default App;
