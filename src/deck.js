import React from 'react';
import ReactDOM from 'react-dom';
import style from "./style.css";
import DominoTile from './dominoTile';


function Deck(props) {   

    return(
        <div className="panel deck">
            <button className="dominoTile centered" onClick= {props.onClick}>   
            </button>
            <button className={props.buttonClass} onClick={()=>{props.prevOnClickHandler()}}>prev</button>
            <button className={props.buttonClass} onClick={()=>{props.nextOnClickHandler()}}>next</button> 
        </div>
    )
}    


export default Deck;