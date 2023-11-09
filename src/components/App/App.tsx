import React from 'react';
import './App.scss';
import { Header } from '../header/Header';
import { Month } from '../Month/Month';

function App() {
  return (
    <div className="app">
      <Header />
      <Month />
    </div>
  );
}

export default App;
