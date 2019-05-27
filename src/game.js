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
                    boardTiles: new Array(),
                    statistics:{
                        turnsSoFar:0,
                        averagePlayTime:0,
                        withdrawals:0,
                        score:0
                    }
                };
        this.needDraw = false;
    }

    componentDidMount(){
        let dominoTiles = this.createTiles();
        let playerTiles = this.chooseStartingTiles(dominoTiles);
        this.needDraw = false;
        this.setState({dominoTiles: dominoTiles,
                       playerTiles: playerTiles
        });
    }

    componentDidUpdate(){
        this.needDraw = this.checkIfNeedDraw();
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
        if(this.needDraw === true){
            let dominoTiles = this.deepCopy(this.state.dominoTiles);
            let playerTiles = this.deepCopy(this.state.playerTiles);
            let newTile = this.chooseRandomTile(dominoTiles);
            playerTiles.push(newTile);

            this.setState({dominoTiles: dominoTiles,
                            playerTiles: playerTiles});
        }
        else{
            alert("you can play");
        }
    }

    topToRightBottomToLeft(selectedTile){
        selectedTile.angle = "horizontal90"; 
    }

    topToLeftBottomToRight(selectedTile){
        selectedTile.angle = "horizontal270";
    }

    flip(selectTile){
        selectTile.angle = "upsideDown";
    }


    dominoTileOnClickHandler(selectedTileValues){
        let game = this.deepCopy(this.state);
        let selectedTile = this.findTile(game,selectedTileValues);

        if(boardObj.isEmpty === true){
            this.firstTurn(game, selectedTile);
            boardObj.isEmpty = false;
        }
        else{
            this.highlightDomino(game, selectedTileValues); 
            boardObj.getPossibleMoves(selectedTile);
        }

        this.setState({ dominoTiles: game.dominoTiles,
                        playerTiles: game.playerTiles,
                        boardTiles: game.boardTiles
                     });
        
    }

    checkIfNeedDraw(){
        let needDraw = true;
        if(boardObj.isEmpty){
            console.log("board empty");
            needDraw = false;
        }
        else{ 
        for(let i=0; i<this.state.playerTiles.length; i++){
                boardObj.getPossibleMoves(this.state.playerTiles[i]);
                console.log(boardObj.possibleMoves);
                if(boardObj.possibleMoves.length > 0){
                    needDraw = false;
                    break;
                }
            }
        }
        boardObj.possibleMoves.length = 0;
        return needDraw;
    }
    

    possibleMoveClickHandler(selectedPossibleMove){
        let game = this.deepCopy(this.state);
        let selectedTile = this.findSelectedTile(game);
        boardObj.possibleMoves.length=0;
        selectedTile.selected = false;
        selectedTile.position.top = selectedPossibleMove.position.top;
        selectedTile.position.left =selectedPossibleMove.position.left;
        selectedTile.angle = selectedPossibleMove.angle;
        selectedTile.location = "board";
        game.playerTiles = game.playerTiles.filter((tile)=>{return this.checkTileLocation(tile,"player")});
        game.boardTiles.push(selectedTile);
        
        boardObj.updateBoard(selectedTile,{row: selectedPossibleMove.row,col: selectedPossibleMove.col});
        
        this.setState({ dominoTiles: game.dominoTiles,
                        playerTiles: game.playerTiles,
                        boardTiles: game.boardTiles
         });
    }

    findSelectedTile(game){
        let res;
        game.playerTiles.forEach(element => {
            if(element.selected === true){
                res = element;
            }
            });

            return res;
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
        selectedTile.position.top = boardObj.startPos.top;
        selectedTile.position.left = boardObj.startPos.left;
        selectedTile.angle = boardObj.startPos.angle;
        selectedTile.location = "board";
        game.boardTiles.push(selectedTile);
        game.playerTiles = game.playerTiles.filter((tile)=>{return this.checkTileLocation(tile,"player")});     
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
                <Player playerTiles={this.state.playerTiles} dominoTileOnClickHandler = {this.dominoTileOnClickHandler.bind(this)}/>
                <Board  boardTiles={this.state.boardTiles} possibleMoves={boardObj.possibleMoves} possibleMoveOnClickHandler = {this.possibleMoveClickHandler.bind(this)}/>
                <Statistics statistics = {this.state.statistics}/>
            </div>
        );
    }
}

export default Game;