import React from 'react';
import GameBoard from './components/GameBoard';
import './App.css';

function App() {
    return (
        <div className="App">
            <h1>Pentago Game</h1>
            <br />
            <br />
            <GameBoard />
        </div>
    );
}

export default App;