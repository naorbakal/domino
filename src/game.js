import React from 'react';
import ReactDOM from 'react-dom';
import style from "./style.css";
import DominoTile from "./dominoTile";

/* Directly adding react element */
// ReactDOM.render(
//     React.createElement('div',null, 'hello world from react '), 
//     document.getElementById("root")
// );

class Game extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="game">
            <DominoTile />
            <DominoTile />
            </div>
        );
    }
}

export default Game;