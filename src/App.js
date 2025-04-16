// src/App.js
import React from 'react';
import { CharacterList } from './characters';
import Footer from './Footer';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">Rick and Morty Characters</h1>
      <CharacterList />
      <Footer />
    </div>
  );
}

export default App;
