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
        let score = this.getPlayerScore(playerTiles);
        this.setState({dominoTiles: dominoTiles,
                       playerTiles: playerTiles,
                       statistics:{
                        turnsSoFar: 0,
                        averagePlayTime: 0,
                        withdrawals: 0,
                        score : score}                      
        });
    }

    componentDidUpdate(){
        let game = this.deepCopy(this.state); 
        this.needDraw = this.checkIfNeedDraw();
        this.checkIfPlayerWin();
    }

    checkIfPlayerWin(){
        if(this.state.playerTiles.length === 0){
            alert("you win");           
        }
    }

    getPlayerScore(playerTiles){
        let score = 0;

        for(let i=0; i<playerTiles.length; i++){
            score += playerTiles[i].values.top + playerTiles[i].values.bottom;
        }
        return score;
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
            let game = this.deepCopy(this.state);
            let newTile = this.chooseRandomTile(game.dominoTiles);
            game.playerTiles.push(newTile);
            game.statistics.turnsSoFar++;
            game.statistics.score = this.getPlayerScore(game.playerTiles);
            game.statistics.withdrawals++;

            this.setState({dominoTiles: game.dominoTiles,
                            playerTiles: game.playerTiles,
                            statistics:{
                                turnsSoFar: game.statistics.turnsSoFar,
                                averagePlayTime: game.statistics.averagePlayTime,
                                withdrawals: game.statistics.withdrawals,
                                score : game.statistics.score}});
        }
        else{
            alert("you can play");
        }
    }

    getPlayerScore(playerTiles){
        let score = 0;
        for(let i=0; i<playerTiles.length; i++){
            score += playerTiles[i].values.top + 
                playerTiles[i].values.bottom;
        }
        return score;
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
                        boardTiles: game.boardTiles,
                        statistics:{
                            turnsSoFar: game.statistics.turnsSoFar,
                            averagePlayTime: game.statistics.averagePlayTime,
                            withdrawals: game.statistics.withdrawals,
                            score : game.statistics.score}
                     });
        
    }

    checkIfNeedDraw(){
        let needDraw = true;
        if(boardObj.isEmpty){
            needDraw = false;
        }
        else{ 
        for(let i=0; i<this.state.playerTiles.length; i++){
                boardObj.getPossibleMoves(this.state.playerTiles[i]);
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

        game.statistics.turnsSoFar++;
        game.statistics.score = this.getPlayerScore(game.playerTiles);
        
        if(game.playerTiles.length === 0){
            for(let i=0; i<game.boardTiles.length; i++){
                game.boardTiles[i].endGame = true;
            }
        }
        
        this.setState({ dominoTiles: game.dominoTiles,
                        playerTiles: game.playerTiles,
                        boardTiles: game.boardTiles,
                        statistics:{
                            turnsSoFar: game.statistics.turnsSoFar,
                            averagePlayTime: game.statistics.averagePlayTime,
                            withdrawals: game.statistics.withdrawals,
                            score : game.statistics.score}

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
        game.statistics.turnsSoFar++;
        game.statistics.score = this.getPlayerScore(game.playerTiles);    
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