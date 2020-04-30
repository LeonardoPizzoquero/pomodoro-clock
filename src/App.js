import React from 'react';
import { ToastContainer } from 'react-toastify';
import HomePage from './pages/HomePage';
import Global from './styles/global';

function App() {
  return (
    <>
      <HomePage />
      <Global />
      <ToastContainer />
    </>
  );
}

export default App;
