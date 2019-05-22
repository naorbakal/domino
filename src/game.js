import React from 'react';
import ReactDOM from 'react-dom';
import style from "./style.css";
import DominoTile from "./dominoTile";
import Deck from "./deck";
import Player from "./player";
import Board from './board';
import Statistics from './statistics';
import DominoTileObj from "./dominoTileTObj";

class Game extends React.Component {
       
    constructor(props){
        super(props);
        this.state={dominoTiles: new Array(),
                    playerTiles: new Array()};
        this.componentDidMount;
    }

    componentDidMount(){
        let dominoTiles = this.createTiles();
        let playerTiles = this.chooseStartingTiles(dominoTiles);
        this.setState({dominoTiles: dominoTiles,
                       playerTiles: playerTiles,
        });
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
        deck[index].location = "player";

        return deck[index]; 
    }
     

    chooseStartingTiles(dominoTiles){
        for(var i=0; i<6 ;i++){
            this.chooseRandomTile(dominoTiles);
        }

        let playerTiles = dominoTiles.filter((tile)=>{
            if(tile.location === "player"){
                return tile;
            }
        });

        return playerTiles;
    }
  
    pullFromDeck(){
        let dominoTiles = this.deepCopy(this.state.dominoTiles);
        let playerTiles = this.deepCopy(this.state.playerTiles);
        let newTile = this.chooseRandomTile(dominoTiles);
        playerTiles.push(newTile);
        this.setState({dominoTiles: dominoTiles,
                       playerTiles: playerTiles});
    }

    render(){
        /*
        let playerTiles = this.state.dominoTiles.filter((tile)=>{
            if(tile.location === "player"){
                return tile;
            }
        });
        */
        
        return (
            <div className="game">
                <Deck onClick={() => this.pullFromDeck()
                }/>
                <Player playerTiles={this.state.playerTiles} />
                <Board  boardTiles={this.state.boardTiles}/>
                <Statistics />
            </div>
        );
    }
}

export default Game;