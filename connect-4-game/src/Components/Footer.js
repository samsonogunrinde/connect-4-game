 import React from "react";
import { GAME_STATE_PLAYING
} from "../Constants";

const Footer =({onNewGameClick, onSuggestClick, gameState}) =>{
    const renderButtons = () => {
        if (gameState === GAME_STATE_PLAYING){
            return <button onClick={onSuggestClick} className="footer-button">Suggest</button>
        }
    return <button onClick={onNewGameClick} className = "footer-button">New Game</button>
    }
    return (
        <div className="panel footer">
            { renderButtons()}
            </div>
    );
    };
export default Footer;