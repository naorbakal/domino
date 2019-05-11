import React from 'react';
import ReactDOM from 'react-dom';

export default class SomeReactComponent extends React.Component {

    constructor(){
        super();

        this.state = {
            direction: 'ltr'
        }
        this.inputCahnge = this.inputCahnge.bind(this);
    }

    render() {
        return (
            <div>
                <p> hello world from react component </p>
                <p> {this.props.subTitle} </p>
                <input name="ff" onChange={this.inputCahnge} style={{direction: this.state.direction}}/>
            </div>
        );
    }

    inputCahnge(e) {
        const value = e.target.value;
        var position =value.search(/[\u0590-\u05FF]/);
        if(position >= 0){
            // alert('String contains Hebrew');
            this.setState({direction: 'rtl'});
        }
    }
}

SomeReactComponent.defaultProps = {
    subTitle: "this is a default sub-title"
}