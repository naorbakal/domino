import React from 'react';
import ReactDOM from 'react-dom';
import style from "./style.css";
import DominoTile from "./dominoTile";
import Deck from "./deck";
import Player from "./player";
import Board from './board';
import Statistics from './statistics';
import DominoTileObj from "./dominoTileTObj";
import {boardObj} from "./boardObj";

class Game extends React.Component {
       
    constructor(props){
        super(props);
        this.state={dominoTiles: new Array(),
                    playerTiles: new Array(),
                    boardTiles: new Array()
                };
    }

    componentDidMount(){
        let dominoTiles = this.createTiles();
        let playerTiles = this.chooseStartingTiles(dominoTiles);
        this.setState({dominoTiles: dominoTiles,
                       playerTiles: playerTiles,
        });
    }

    checkTileLocation(tile,location){
        if(tile.location === location){
            return tile;
        }
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
        deck = dominoTiles.filter((tile) => {return this.checkTileLocation(tile,"deck")});
        index = Math.floor(Math.random() * deck.length);
        deck[index].location = "player";

        return deck[index]; 
    }
     

    chooseStartingTiles(dominoTiles){
        for(var i=0; i<6 ;i++){
            this.chooseRandomTile(dominoTiles);
        }

        let playerTiles = dominoTiles.filter((tile)=>{return this.checkTileLocation(tile,"player")});
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

    topToRight(){
        
    }

    topToLeft(){

    }

    topToBotton(){

    }

    bottomToRight(){

    }

    bottomToLeft(){

    }

    bottomToTop(){

    }


    dominoTileOnClickHandler(selectedTileValues){
        let game = this.deepCopy(this.state);
        let possibleMoves;
        let selectedTile = this.findTile(game,selectedTileValues);

        this.firstTurn(game, selectedTile);   
        this.highlightDomino(game, selectedTileValues);

        possibleMoves = boardObj.getPossibleMoves(selectedTileValues);

        this.setState({ dominoTiles: game.dominoTiles,
                        playerTiles: game.playerTiles,
                        boardTiles: game.boardTiles});
    }



    findTile(game,dominoValues){
        let res;
        game.playerTiles.forEach(element => {
            if(element.values.top === dominoValues.top &&
               element.values.bottom === dominoValues.bottom){             
                res = element;
            }
            });

            return res;
        }

    firstTurn(game, selectedTile){
        let boardPosition = {row:28, col:28, tile:selectedTile};
        if(boardObj.isEmpty){
            selectedTile.position.top = boardObj.nextPositions[0].top;
            selectedTile.position.left = boardObj.nextPositions[0].left;
            selectedTile.angle = boardObj.nextPositions[0].angle;
            selectedTile.location = "board";
            game.boardTiles.push(selectedTile);
            game.playerTiles = game.playerTiles.filter((tile)=>{return this.checkTileLocation(tile,"player")});     
            }
    
        boardObj.isEmpty = false;
    
    boardObj.updateBoard(selectedTile,boardPosition);
}

    highlightDomino(game, selectedDominoTile){
        game.playerTiles.forEach(element => {
            if(element.values.top === selectedDominoTile.top &&
               element.values.bottom === selectedDominoTile.bottom){
                element.selected = true;
            }
            else{
                element.selected = false;
            }            
        });
    }


    render(){        
        return (
            <div className="game"> 
                <Deck onClick={() => this.pullFromDeck()
                }/>
                <Player playerTiles={this.state.playerTiles} dominoTileOnClickHandler = {this.dominoTileOnClickHandler.bind(this)} />
                <Board  boardTiles={this.state.boardTiles}/>
                <Statistics />
            </div>
        );
    }
}

export default Game;