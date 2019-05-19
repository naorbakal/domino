import React from 'react';
import ReactDOM from 'react-dom';
import style from "./style.css";
import DominoTile from "./dominoTile";
import Deck from "./deck";
import Player from "./player";
import Board from './board';
import Statistics from './statistics';
import DominoTileObj from "./dominoTileTObj";
import { isArray } from 'util';


class Game extends React.Component {
       
    constructor(props){
        super(props);
        this.dominoTilesArr = new Array();
        this.createTiles()  
        this.state={dominoTiles: this.dominoTilesArr};
    }

    createTiles(){
        for(let i=0; i<=6; i++){
            for(let j=i; j<=6; j++){
                this.dominoTilesArr.push(new DominoTileObj(i,j));
            }
        }
    }  
     chooseRandomTile(){
        let index;
        let tempDeck = new Array();
        tempDeck = this.dominoTilesArr.filter((tile) =>{
            if(tile.location === "deck"){
                return tile;
            }
        });
        index = Math.floor(Math.random() * tempDeck.length);
        console.log(tempDeck);
        tempDeck[index].location="player";  
        return tempDeck[index];     
    }

    chooseStartingTiles(){
        var tiles = new Array();
        for(var i=0; i<6 ;i++){
            tiles.push(this.chooseRandomTile());
        }
        return tiles;
    }
  
    render(){
        let startingTiles = this.chooseStartingTiles();
        return (
            <div className="game">
                <Deck />
                <Player startingTiles={startingTiles} />
                <Board />
                <Statistics />
            </div>
        );
    }
}

export default Game;