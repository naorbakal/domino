import React from 'react';
import ReactDOM from 'react-dom';
import style from "./style.css";

function Statistics(props){
    return(
        <div className="panel stat">
            <div className="clock">00:00</div>
            <div className="statLabel"> Turns So Far
                <p>0</p>
            </div>    
            <div className="statLabel">Average Play Time
                <p>0</p>
            </div>    
            <div className="statLabel">Withdrawals
                <p>0</p>
            </div>
            <div className="statLabel">Score
                <p>0</p>
            </div>

        </div>
    )
}
export default Statistics;