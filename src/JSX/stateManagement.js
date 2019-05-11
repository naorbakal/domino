import React from 'react';
import ReactDOM from 'react-dom';

class DateShower extends React.Component {
    render() {    
        return (
            <div>               
                <p> current Date is: {new Date().getTime()} </p>               
                <button onClick={this.updateTime.bind(this)}>Force Update</button>
            </div>
        );
    }    
    
    updateTime() {
        this.forceUpdate();
    }
}

class Counter extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
			name: 'Web Development Course',
            count: 0
        }
        // this.state = {
        //     x: 0
        // }
    }

    increseCounter() {
        this.setState({count: this.state.count+1})
        // this.setState((preState) => ({count: preState.count+1}));
        // this.state={x:2}
        // this.setState(()=>({x:3}));
        // this.setState({x: this.state.x+1}); 
        // this.setState((prevState)=>({x: prevState.x+1})); 
    }    

    render() {
        return (
            <div>				
                <h3>{this.state.name}</h3>
				<h3>counter = {this.state.count}</h3>
				{/* <h3>counter = {this.state.x}</h3> */}
                <button onClick={this.increseCounter.bind(this)}>increase counter</button>
            </div>
        );
    }
}

// export default DateShower;
export default Counter;