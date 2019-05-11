import React from 'react';
import ReactDOM from 'react-dom';

export default class Uncontrolled extends React.Component {
    constructor(args) {
        super(args);
        this.doSubmit = this.doSubmit.bind(this);
        this.state = { name: '' }
    }

    doSubmit(event) {
        event.preventDefault();
        const inputValue = event.target.elements.usersName.value;
        this.setState({name: inputValue});
        console.log('input name', inputValue);
    }

    render() {
        return (
            <form onSubmit={this.doSubmit} >
                <label>name: </label>
                <input name="usersName"/>
            </form>
        );
    }
}
