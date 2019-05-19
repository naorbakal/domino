import React from 'react';
import ReactDOM from 'react-dom';
import style from "./style.css";

class DominoTileObj{
    constructor(top, bottom){ 
        this.angle="horizontal",
        this.position={
            x:null,
            y:null
        }
        this.location="deck",
        this.values={
            top:top,
            bottom:bottom
        }   
    }
}

export default DominoTileObj;