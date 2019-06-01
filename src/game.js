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
                    board: this.deepCopy(boardObj.matrix),
                    statistics:{
                        turnsSoFar:0,
                        averagePlayTime:0,
                        withdrawals:0,
                        score:0
                    },
                };
        this.needDraw = false;
        this.gameStartingTime;
        this.history = new Array();
        this.endGame = false;
    }

    componentDidMount(){
        let dominoTiles = this.createTiles();
        let playerTiles = this.chooseStartingTiles(dominoTiles);
        this.needDraw = false;
        this.gameStartingTime = Date.now();
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
        this.needDraw = this.checkIfNeedDraw();
        this.checkIfPlayerWinOrLoose();
    }

    checkIfPlayerWinOrLoose(){
        if(this.state.playerTiles.length === 0){
            this.endGame = true;
            console.log(this.endGame);
            alert("you win");           
        }
        else{
            let deck = this.state.dominoTiles.filter((tile)=>{return this.checkTileLocation(tile,"deck")});
            if(deck.length === 0 && this.needDraw === true){
                this.endGame = true;
                alert("you lose");
            }
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
        if(deck.length === 0){
            alert("deck is empty");
        }
        else{
        index = Math.floor(Math.random() * deck.length);
        deck[index].location = "player";

        return deck[index]; 
        }
    }
     

    chooseStartingTiles(dominoTiles){
        for(var i=0; i<6 ;i++){
            this.chooseRandomTile(dominoTiles);
        }

        let playerTiles = dominoTiles.filter((tile)=>{return this.checkTileLocation(tile,"player")});
        return playerTiles;
    }
    
    updateStatistics(game,updateWithdrawal = false ){
        if(updateWithdrawal === true){
            game.statistics.withdrawals++;
        }
        game.statistics.turnsSoFar++;
        game.statistics.score = this.getPlayerScore(game.playerTiles);
        game.statistics.averagePlayTime =  (((Date.now()- this.gameStartingTime)/1000) / game.statistics.turnsSoFar).toFixed(2);
    }
    pullFromDeck(){
        if(this.needDraw === true){
            let game = this.deepCopy(this.state);
            this.history.push(this.state);
            let newTile = this.chooseRandomTile(game.dominoTiles);
            game.playerTiles.push(newTile);
            this.updateStatistics(game,true);
            this.setState(game);
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

        this.setState(game);
        
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
        this.history.push(this.state);
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
        game.board = boardObj.matrix;
        this.updateStatistics(game);

        this.checkIfPlayerWinOrLoose();
       
        if(game.playerTiles.length === 0){
            for(let i=0; i<game.boardTiles.length; i++){
                game.boardTiles[i].endGame = true;
            }
        }

        
        this.setState(game);
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
        this.history.push(this.state);
        let boardPosition = {row:28, col:28, tile:selectedTile};
        selectedTile.position.top = boardObj.startPos.top;
        selectedTile.position.left = boardObj.startPos.left;
        selectedTile.angle = boardObj.startPos.angle;
        selectedTile.location = "board";
        game.boardTiles.push(selectedTile);
        game.playerTiles = game.playerTiles.filter((tile)=>{return this.checkTileLocation(tile,"player")});     
        boardObj.updateBoard(selectedTile,boardPosition);
        game.board = boardObj.matrix;
        this.updateStatistics(game);   
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

    prevOnClickHandler(){
        let index = this.state.statistics.turnsSoFar - 1;
        if(index < 0){
            alert("no more prev ya dush!");
        }
        else{
        if(this.state.statistics.turnsSoFar === this.history.length){
            this.history.push(this.state);
            }
        }

        this.setState({ dominoTiles: this.history[index].dominoTiles,
                        playerTiles: this.history[index].playerTiles,
                        boardTiles: this.history[index].boardTiles,
                        board: this.history[index].board,
                        statistics: this.history[index].statistics,
                        history: this.history
        });
        if(index === 0){
            boardObj.isEmpty = true;
        }
        boardObj.matrix = this.history[index].board;
    }

    nextOnClickHandler(){
    let index = this.state.statistics.turnsSoFar + 1;
        if(this.history.length <= index ){
            alert("no more next ya dush!");
        }
        else{
            this.setState({ dominoTiles: this.history[index].dominoTiles,
                playerTiles: this.history[index].playerTiles,
                boardTiles: this.history[index].boardTiles,
                board: this.history[index].board,
                statistics: this.history[index].statistics,
                });
            boardObj.matrix = this.history[index].board;  
        }

        if(index === 1){
            boardObj.isEmpty = false;
        }
    }

    
    render(){
        let buttonClass;      
        if(this.endGame === true){
            buttonClass = " ";
        }
        else{
            buttonClass = "hidden";
        }
        return (
                <div className="game"> 
                <Deck onClick={() => this.pullFromDeck()
                } prevOnClickHandler={this.prevOnClickHandler.bind(this)} 
                nextOnClickHandler={this.nextOnClickHandler.bind(this)}
                 buttonClass={buttonClass}/>
                     <Player playerTiles={this.state.playerTiles} 
                    dominoTileOnClickHandler = {this.dominoTileOnClickHandler.bind(this)}/>
                <Board  boardTiles={this.state.boardTiles} 
                possibleMoves={boardObj.possibleMoves} 
                possibleMoveOnClickHandler = {this.possibleMoveClickHandler.bind(this)}/>
                <Statistics statistics = {this.state.statistics}/>
            
            </div>
        )
    }
}

export default Game;