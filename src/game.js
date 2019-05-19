import React from 'react';
import ReactDOM from 'react-dom';
import style from "./style.css";
import DominoTile from "./dominoTile";
import Deck from "./deck";
import Player from "./player";
import Board from './board';
import Statistics from './statistics';
import dominotileObj from "./dominoTileTObj";


class Game extends React.Component {
       
    constructor(props){
        super(props);
        this.dominoTilesArr = new Array();
        createTiles();  
        this.state={dominoTiles: this.dominoTilesArr};
    }

    createTiles = ()=>{
        for(let i=0; i<=6; i++){
            for(let j=i; j<=6; j++){
                this.dominoTilesArr.push(new DominoTileObj(i,j));
            }
        }
    }  

    chooseRandomTile= ()=>{
        return this.dominoTilesArr[Math.floor(Math.random()*this.dominoTilesArr.length)];
    }
    render(){

        return (
            <div className="game">
                <Deck />
                <Player />
                <Board />
                <Statistics />
            </div>
        );
    }
}

export default Game;