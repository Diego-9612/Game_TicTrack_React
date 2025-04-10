// App.jsx
import { useState } from 'react';
import { GameBoard } from './Components/GameBoard';
import { Player } from './Components/Player';
import { Log } from './Components/Log';
import { GameOver } from './Components/GameOver';
import { WINNING_COMBINATIONS } from './winning-combinations';

// GameBoard.jsx
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(gameTurn) {
  let currentPlayer = 'X';

  if (gameTurn.length > 0 && gameTurn[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;

}

function deriveWinner(gameBoard, playersName){

  let winner ;

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = playersName[firstSquareSymbol];
    }
  }

  return winner;

}

function deriveGameBoard(gameTurn){

  const gameBoard = initialGameBoard.map(array => [...array]);

  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() {
  const [playersName, setPlayersName] = useState({ X: 'Player 1', O: 'Player 2' })
  const [gameTurn, setGameTurn] = useState([]);

  const gameBoard = deriveGameBoard(gameTurn);

  const winner = deriveWinner(gameBoard, playersName)

  const hasDraw = gameTurn.length === 9 && !winner;

  const activePlayer = deriveActivePlayer(gameTurn);

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurn((prevGameTurn) => {

      const currentPlayer = deriveActivePlayer(prevGameTurn);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevGameTurn,
      ];

      return updatedTurns;
    });
  };

  const handleRestart = () => {
    setGameTurn([]);
  }

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayersName(prevPlayersName => {
      return{
        ...prevPlayersName,
        [symbol]: newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={playersName['X']} symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
          <Player initialName={playersName['O']} symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard board={gameBoard} onSelectSquare={handleSelectSquare} onRestart={handleRestart} />
      </div>
      <Log turns={gameTurn} />
    </main>
  );
}

export default App;
