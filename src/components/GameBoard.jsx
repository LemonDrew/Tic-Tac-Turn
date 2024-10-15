import React, { useState } from 'react';
import { FaArrowRight, FaArrowDown, FaArrowLeft, FaArrowUp } from "react-icons/fa";

const GameBoard = () => {
    const [board, setBoard] = useState([...Array(6)].map(() => Array(6).fill(0))); // Initialize a 6x6 board
    const [turn, setTurn] = useState(1); // Player 1 starts
    const [errorMessage, setErrorMessage] = useState('');
    const [rotation, setRotation] = useState(0); // State for rotation value
    const [selectedCell, setSelectedCell] = useState({ row: null, col: null }); // State for selected cell

    const handleCellClick = (row, col) => {
        setSelectedCell({ row, col }); // Set the selected cell
        setErrorMessage(''); // Clear any previous error message
    };

    const confirmMove = () => {
        const { row, col } = selectedCell;

        if (row === null || col === null) {
            setErrorMessage('Please select a cell first!');
            return;
        }

        // Check if the move is valid
        if (board[row][col] !== 0) {
            setErrorMessage('Cell is already occupied!');
            return;
        }

        // Apply the move
        const newBoard = applyMove(board, turn, row, col, rotation);
        setBoard(newBoard);

        // Check for victory status
        const victoryStatus = check_victory(newBoard, turn);
        if (victoryStatus) {
            setTimeout(() => {
                alert(`Player ${turn} wins!`);
                resetBoard(); // Reset the board after a win
            }, 500); // Delay of 500 milliseconds (0.5 seconds)
        } else {
            setTurn(turn === 1 ? 2 : 1); // Switch turns
            setRotation(0); // Reset rotation value after move
            setSelectedCell({ row: null, col: null }); // Reset selected cell
        }
    };

    const resetBoard = () => {
        setBoard([...Array(6)].map(() => Array(6).fill(0))); // Reset the board to the initial state
        setTurn(1); // Reset the turn to player 1
        setErrorMessage(''); // Clear the error message on reset
        setRotation(0); // Reset the rotation value
        setSelectedCell({ row: null, col: null }); // Reset selected cell
    };

    const handleRotationChange = (e) => {
        const value = e.target.value;
        const numberValue = Number(value);
        if (!isNaN(numberValue) && numberValue >= 1 && numberValue <= 8) {
            setRotation(numberValue); // Update rotation state
        } else {
            setRotation(0); // Reset to 0 if invalid input
        }
    };

    // Game logic functions
    const applyMove = (board, turn, row, col, rot) => {
        const newBoard = board.map(row => row.slice()); // Create a copy of the board
        newBoard[row][col] = turn; // Place the player's piece
        return rotate(newBoard, rot); // Rotate the board
    };

    const rotate = (board, rot) => {
        const newBoard = JSON.parse(JSON.stringify(board)); // Deep copy of the board
    
        // Define helper function for 90-degree clockwise rotation
        const rotateClockwise = (startRow, startCol) => {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    newBoard[startRow + j][startCol + 2 - i] = board[startRow + i][startCol + j];
                }
            }
        };
    
        // Define helper function for 90-degree counterclockwise rotation
        const rotateCounterClockwise = (startRow, startCol) => {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    newBoard[startRow + 2 - j][startCol + i] = board[startRow + i][startCol + j];
                }
            }
        };
    
        // Determine the rotation direction and quadrant
        if (rot === 1) {
            rotateClockwise(0, 0); // Top-left clockwise
        } else if (rot === 2) {
            rotateClockwise(0, 3); // Top-right clockwise
        } else if (rot === 3) {
            rotateClockwise(3, 0); // Bottom-left clockwise
        } else if (rot === 4) {
            rotateClockwise(3, 3); // Bottom-right clockwise
        } else if (rot === 5) {
            rotateCounterClockwise(0, 0); // Top-left counterclockwise
        } else if (rot === 6) {
            rotateCounterClockwise(0, 3); // Top-right counterclockwise
        } else if (rot === 7) {
            rotateCounterClockwise(3, 0); // Bottom-left counterclockwise
        } else if (rot === 8) {
            rotateCounterClockwise(3, 3); // Bottom-right counterclockwise
        }
    
        return newBoard;
    };
    

    const check_victory = (board, turn) => {
        if (check_status(board, turn)) return turn; // Return player number if they win
        if (is_full(board)) return 3; // Return 3 if it's a draw
        return 0; // Return 0 if the game is still ongoing
    };

    const check_status = (board, turn) => {
        return check_horizontal(board, turn) || check_vertical(board, turn) ||
            check_diagonal(board, turn) || check_opposite_diagonal(board, turn);
    };

    const check_horizontal = (board, turn) => {
        for (let i = 0; i < 6; i++) {
            let count = 0;
            for (let j = 0; j < 6; j++) {
                count = (board[i][j] === turn) ? count + 1 : 0;
                if (count === 5) return true; // 5 in a row
            }
        }
        return false;
    };

    const check_vertical = (board, turn) => {
        for (let j = 0; j < 6; j++) {
            let count = 0;
            for (let i = 0; i < 6; i++) {
                count = (board[i][j] === turn) ? count + 1 : 0;
                if (count === 5) return true; // 5 in a column
            }
        }
        return false;
    };

    const check_diagonal = (board, turn) => {
        // Check main diagonal (top-left to bottom-right)
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                if (i + 4 < 6 && j + 4 < 6 &&
                    board[i][j] === turn &&
                    board[i + 1][j + 1] === turn &&
                    board[i + 2][j + 2] === turn &&
                    board[i + 3][j + 3] === turn &&
                    board[i + 4][j + 4] === turn) {
                    return true;
                }
            }
        }
        return false;
    };

    const check_opposite_diagonal = (board, turn) => {
        // Check anti-diagonal (top-right to bottom-left)
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                if (i + 4 < 6 && j - 4 >= 0 &&
                    board[i][j] === turn &&
                    board[i + 1][j - 1] === turn &&
                    board[i + 2][j - 2] === turn &&
                    board[i + 3][j - 3] === turn &&
                    board[i + 4][j - 4] === turn) {
                    return true;
                }
            }
        }
        return false;
    };

    const is_full = (board) => {
        return board.every(row => row.every(cell => cell !== 0)); // Check if all cells are filled
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            {/* Top-Left Corner */}
            <div style={{
               position: 'absolute',
               top: 205,
               left: 490,
               padding: '10px',
               backgroundColor: 'black'
            }}>
                <FaArrowRight />
            </div>

            <div style={{
                position: 'absolute',
                top: 250,
                left: 450,
                padding: '10px',
                backgroundColor: 'black'
            }}>
                <FaArrowDown />
            </div>

            {/* Top-Right Corner */}
            <div style={{
                position: 'absolute',
                top: 205,
                right: 510,
                padding: '10px',
                backgroundColor: 'black'
            }}>
                <FaArrowLeft />
            </div>

            {/* Top-Right Corner */}
            <div style={{
                position: 'absolute',
                top: 250,
                right: 470,
                padding: '10px',
                backgroundColor: 'black'
            }}>
                <FaArrowDown />
            </div>

            {/* Bottom-Left Corner */}
            <div style={{
                position: 'absolute',
                bottom: 178,
                left: 450,
                padding: '10px',
                backgroundColor: 'black'
            }}>
                <FaArrowUp />
            </div>

            {/* Bottom-Left Corner */}
            <div style={{
                position: 'absolute',
                bottom: 130,
                left: 490,
                padding: '10px',
                backgroundColor: 'black'
            }}>
                <FaArrowRight />
            </div>

            {/* Bottom-Right Corner */}
            <div style={{
                position: 'absolute',
                bottom: 178,
                right: 470,
                padding: '10px',
                backgroundColor: 'black'
            }}>
                <FaArrowUp />
            </div>

            {/* Bottom-Right Corner */}
            <div style={{
                position: 'absolute',
                bottom: 130,
                right: 510,
                padding: '10px',
                backgroundColor: 'black'
            }}>
                <FaArrowLeft/>
            </div>

            <div style={{ marginRight: '20px' }}>
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} style={{ display: 'flex' }}>
                        {row.map((cell, colIndex) => (
                            <div
                                key={colIndex}
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    border: '1px solid black',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    backgroundColor: selectedCell.row === rowIndex && selectedCell.col === colIndex ? 'lightyellow'
                                        : cell === 0 ? 'white' // Empty cell 
                                        : cell === 1 ? 'lightblue' // Player 1's piece
                                        : 'lightcoral', // Player 2's piece
                                }}
                            >
                                {cell === 1 ? 'X' : cell === 2 ? 'O' : ''}
                            </div>
                        ))}
                    </div>
                ))}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <div style={{ marginTop: '10px' }}>
                    <input
                        type="number"
                        value={rotation}
                        onChange={handleRotationChange}
                        min="1"
                        max="8"
                        placeholder="Enter rotation (1-8)"
                        style={{ marginRight: '5px' }}
                    />
                    <button onClick={confirmMove}>Confirm Move</button>
                </div>
                <button onClick={resetBoard} style={{ marginTop: '10px' }}>Reset Game</button>
            </div>
        </div>
    );
};

export default GameBoard;
