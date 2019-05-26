import React from 'react';
import ReactDOM from 'react-dom';
import style from "./style.css";
import DominoTile from "./dominoTile"
import PossibleMoveTile from "./possibleMoveTile"

function Board(props){
    const listItems = props.boardTiles.map((tile)=>{
        return <DominoTile
         key={tile.values.top.toString() + tile.values.bottom.toString()}
         selected={tile.selected}
         tile={tile}
         onClickHandler={props.dominoTileOnClickHandler}
         class = "dominoTile"
         />
    });
    
     const possibleMovesOnBoard = props.possibleMoves.map((possibleMove)=>{
        return <PossibleMoveTile 
         angle = {possibleMove.angle}
         position = {possibleMove.position}
        />
     });

    return (
        <div className="board">
        {listItems}
        {possibleMovesOnBoard}
        </div>
    )
}
export default Board;