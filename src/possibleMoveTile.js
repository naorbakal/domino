import React from 'react';
import ReactDOM from 'react-dom';
import style from "./style.css";

function PossibleMoveTile(props){
    const styleObj ={
        top: props.position.top.toString() +"%",
        left: props.position.left.toString() +"%"
  }

    return(
        <div 
        key = {"top:" + props.position.top.toString() + props.position.top.toString()}
        className={"possibleMove " + props.angle}
        style ={styleObj}
        onClick={()=>{props.onClickHandler({top:props.position.top, left:props.position.left})}}
        >      
        </div>
    )
}

export default PossibleMoveTile;