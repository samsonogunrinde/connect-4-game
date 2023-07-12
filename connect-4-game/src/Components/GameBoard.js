import React, {useState} from "react";
import GameCircle from "./GameCircle";
import "../Game.css";
import Header from "./Header";
import Footer from "./Footer";
import { isWinner, isDraw, getComputerMove} from "../helper";
import { GAME_STATE_PLAYING,
        GAME_STATE_WIN,
        GAME_STATE_DRAW,
        NOPLAYER,
        NOCIRCLES,
        PLAYER1,
        PLAYER2  
}from "../Constants";


const GameBoard =() => {
    const [gameBoard, setGameBoard] = useState(Array(NOCIRCLES).fill(NOPLAYER));
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER1);
    const [gameState, setGameState] = useState(GAME_STATE_PLAYING);
    const [winPlayer, setWinPlayer] = useState(NOPLAYER);

    
    const initGame = () => {
        setCurrentPlayer(PLAYER1);
        setGameBoard(Array(NOCIRCLES).fill(NOPLAYER));
        setGameState(GAME_STATE_PLAYING);
    }

    const initBoard =() =>{
        const circles = [];
        for (let i = 0; i < NOCIRCLES; i++){
            circles.push(renderCircle(i));
        }
        return circles;
    };

    
    const circleClicked =(id) => {
        console.log('circle clicked:' + id);

        if (gameBoard[id] !== NOPLAYER) return;
        if (gameState !== GAME_STATE_PLAYING) return;

        if (isWinner(gameBoard, id, currentPlayer)) {
            setGameState(GAME_STATE_WIN);
            setWinPlayer(currentPlayer);
        }
        if (isDraw(gameBoard, id, currentPlayer)) {
            setGameState(GAME_STATE_DRAW);
            setWinPlayer(NOPLAYER)
        }

        setGameBoard(prev =>{
            return prev.map((circle, pos) =>{
                if(pos === id) return currentPlayer;
                return circle;
            })
        })

        setCurrentPlayer(currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1);
        console.log(gameBoard);
        console.log(currentPlayer);
    }

    const renderCircle = (id) => {
        return (<GameCircle key={id} id={id} className={`player${gameBoard[id]}`} onCircleClicked={circleClicked}/>
        );
    };

    const onSuggestClick = ()=>{
        circleClicked(getComputerMove(gameBoard));
    }
    const onNewGameClick = () => {
        initGame();
    }
      return (
        <>
        <Header gameState={gameState} currentPlayer= {currentPlayer} winPlayer={winPlayer} />
        <div className= "gameBoard"> {initBoard()} </div>
        <Footer onSuggestClick={onSuggestClick} onNewGameClick={onNewGameClick} gameState={gameState} />
        </>
      )
    }
export default GameBoard;
