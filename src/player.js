import React from 'react';
import ReactDOM from 'react-dom';
import style from "./style.css";
import DominoTile from "./dominoTile";

function Player(props) {
    return (
        <footer className="player">
            <DominoTile values={{first:3,second:5}} />
        </footer>
    )
  }

export default Player;  