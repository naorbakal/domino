import React from 'react';
import ReactDOM from 'react-dom';
import style from "./style.css";

/* Directly adding react element */
// ReactDOM.render(
//     React.createElement('div',null, 'hello world from react '), 
//     document.getElementById("root")
// );

class DominoTile extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="dominoTile">
            <span className="line"></span>
            <span className="tcc135"></span>
            <span className="bcc135"></span>
            </div>
        );
    }
}

export default DominoTile;