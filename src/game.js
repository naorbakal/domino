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
        this.componentDidMount 
    }

    componentDidMount(){
        let dominoTiles = this.createTiles();
        this.chooseStartingTiles(dominoTiles);
        this.setState({dominoTiles: dominoTiles});
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
        return tempDominoTilesArr;
    }  

     chooseRandomTile(dominoTiles){
        let index;
        let deck = new Array();
        deck = dominoTiles.filter((tile) =>{
            if(tile.location === "deck"){
                return tile;
            }
        });
        index = Math.floor(Math.random() * deck.length);
        deck[index].location="player"; 
        
        return dominoTiles;
    }
     

    chooseStartingTiles(dominoTiles){
        for(var i=0; i<6 ;i++){
            this.chooseRandomTile(dominoTiles);
        }
    }
  
    pullFromDeck(){
        let dominoTiles = this.deepCopy(this.state.dominoTiles);
        this.chooseRandomTile(dominoTiles);
        this.setState({dominoTiles: dominoTiles});
    }

    render(){
        let playerTiles = this.state.dominoTiles.filter((tile)=>{
            if(tile.location === "player"){
                return tile;
            }
        });
        
        return (
            <div className="game">
                <Deck onClick={() => this.pullFromDeck()
                }/>
                <Player playerTiles={playerTiles} />
                <Board />
                <Statistics />
            </div>
        );
    }
}

export default Game;