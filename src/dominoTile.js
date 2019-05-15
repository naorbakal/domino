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
        this.classes = ["bcc135","tcc135","bbl23456","ttl456","bcl6","tcl6","btl456","tbl23456","btr23456","ttr23456","bcr6","tcr6","bbr456","tbr456"];
    }
    
    render(){
        
        var key = this.props.values.first.toString() + this.props.values.second.toString();
        var rgx = new RegExp ("^t.*" + this.props.values.first);
        console.log(rgx);
        const topDots = this.classes.map((classString,index) => {
            
            if (classString.search(rgx) !== -1){
                console.log(classString);
                return <span key={key + " top " +index} className= {classString}></span>
            }            
        });

        rgx = new RegExp ("^b.*" + this.props.values.second);    
        const buttomDots = this.classes.map((classString,index) => {
             
            if (classString.search(rgx) !== -1){
                return <span key={key + " buttom " +index} className={classString} />
            }
        }); 
  
        return (
            <div className="dominoTile">
                <span className="line" />
                {topDots}
                {buttomDots}
            </div>
        );
    }
}

export default DominoTile;