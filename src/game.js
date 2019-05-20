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
        this.state={dominoTiles: new Array()};
        this.createTiles();
        this.tiles = this.chooseStartingTiles();
    }

    deepCopy(obj){
        return JSON.parse(JSON.stringify(obj));
     }

    createTiles(){

        let tempDominoTilesArr = new Array();
        for(let i=0; i<=6; i++){
            for(let j=i; j<=6; j++){
                tempDominoTilesArr.push(new DominoTileObj(i,j)); 
            }
        }
        this.state.dominoTiles = this.deepCopy(tempDominoTilesArr);
        tempDominoTilesArr[0].values = {top:1,bottom:1};
        console.log(this.state.dominoTiles[0].values);
        console.log(tempDominoTilesArr[0].values);
    }  

     chooseRandomTile(){
        let index;
        let tempDeck = new Array();
        tempDeck = this.state.dominoTiles.filter((tile) =>{
            if(tile.location === "deck"){
                return tile;
            }
        });
        index = Math.floor(Math.random() * tempDeck.length);
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
  
    pullFromDeck(){
        chooseRandomTile();
        this.setState((state) =>{{dominoTiles: state.dominoTiles}});
    }

    render(){
        let playerTiles = this.state.dominoTiles.filter((tile)=>{
            if(tile.location === "player"){
                return tile;
            }
        });
        
        return (
            <div className="game">
                <Deck onClick={()=>{this.pullFromDeck.bind(this)
                }}/>
                <Player playerTiles={playerTiles} />
                <Board />
                <Statistics />
            </div>
        );
    }
}

export default Game;