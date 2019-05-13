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
        const classes = ["bcc135","tcc135","bbl23456","ttl456","bcl6","tcl6","btl456","tbl23456","btr23456","ttr23456","bcr6","tcr6","bbr456","tbr456"];
    }
    
    render(){

        const dots = this.props.value.map((number) =>{
            this.classes.map((class) =>{
                if (class.search("^t.*1\w+") != -1){

                }
            });
        });
        return (
            <div className="dominoTile">
            <span className="line"></span>
            {/* <span className="tcc135"></span> */}
            {/* <span className="bcc135"></span> */}
            {/* <span className="bbl23456"></span> */}
            {/* <span className="ttl456"></span> */}
            {/* <span className="bcl6"></span> */}
            {/* <span className="tcl6"></span> */}
            {/* <span className="btl456"></span> */}
            <span className="tbl23456"></span>
            {/* <span className="btr23456"></span> */}
            <span className="ttr23456"></span>
            {/* <span className="bcr6"></span> */}
            {/* <span className="tcr6"></span> */}
            {/* <span className="bbr456"></span> */}
            {/* <span className="tbr456"></span> */}
            </div>
        );
    }
}

export default DominoTile;