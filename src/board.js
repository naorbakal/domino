import React from 'react';
import ReactDOM from 'react-dom';
import style from "./style.css";
import DominoTile from "./dominoTile"

function Board(props){
    const listItems = props.boardTiles.map((tile)=>{
        return <DominoTile
         key={tile.values.top.toString() + tile.values.bottom.toString()}
         selected={tile.selected}
         tile={tile}
         onClickHandler={props.dominoTileOnClickHandler}
         />
    });
    return (
        <div className="board">
        {listItems}
        </div>
    )
}
export default Board;