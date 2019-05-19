import React from 'react';
import ReactDOM from 'react-dom';
import style from "./style.css";
import DominoTile from "./dominoTile";

function Player(props) {
    const listItems = props.startingTiles.map((tile)=>{
       return <DominoTile values={{top:tile.values.top,bottom:tile.values.bottom}}/>
    })
    return (
        <footer className="player">
            {listItems}
        </footer>
    )
  }

export default Player;  