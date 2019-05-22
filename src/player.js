import React from 'react';
import ReactDOM from 'react-dom';
import style from "./style.css";
import DominoTile from "./dominoTile";

function Player(props) {
    const listItems = props.playerTiles.map((tile)=>{
       return <DominoTile key={"" + tile.values.top.toString() + tile.values.bottom.toString()} values={{top:tile.values.top,bottom:tile.values.bottom}}/>
    })
    return (
        <footer className="player">
            {listItems}
        </footer>
    )
  }

export default Player;  