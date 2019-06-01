import React from 'react';
import ReactDOM from 'react-dom';
import style from "./style.css";
import DominoTile from './dominoTile';


function Deck(props) {   

    return(
        <div className="panel deck"> 
            <div className={props.buttonClass +"arrow-left"} onClick={()=>props.prevOnClickHandler()}></div>          
            <button className="dominoTile " onClick= {props.onClick}>   
            </button> 
            <div className={props.buttonClass +"arrow-right"} onClick={()=>props.nextOnClickHandler()}></div>          
        </div>
    )
}    


export default Deck;