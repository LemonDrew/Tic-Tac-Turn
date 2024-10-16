import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import GameBoard from './components/GameBoard';
import Auth from './components/Auth'; // Import the Auth component
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <h1>Pentago Game</h1>
                <Routes>
                    {/* Home route with Auth component for login */}
                    <Route 
                        path="/" 
                        element={
                            <div>
                                <h2>Welcome! Please log in to play the game.</h2>
                                <Auth />  {/* Use Auth component here */}
                            </div>
                        } 
                    />
                    
                    {/* Game route */}
                    <Route path="/game" element={<GameBoard />} />
                    
                    {/* Redirect to home if an unknown route is accessed */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
