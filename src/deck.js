import React from 'react';
import ReactDOM from 'react-dom';
import style from "./style.css";
import DominoTile from './dominoTile';


function Deck(props) {   

    var classList={

    }
    return(
        <div className="panel">
            <button className="dominoTile centered" onClick= {props.onClick}>    
            </button>
        </div>
    )
}    


export default Deck;