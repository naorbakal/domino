import React from 'react';
import ReactDOM from 'react-dom';

export default class Controlled extends React.Component {
    constructor(args) {
        super(args);
        this.setUserName = this.setUserName.bind(this);
        this.state = { name: '' }
    }

    setUserName(event) {
        const inputValue = event.target.value;        
        this.setState({name: inputValue});
        console.log('controlled input value: ', inputValue);
    }

    render() {
        return (
            <form>
                <label>name: </label>
                <input
                    name="usersName"
                    value={this.state.name}
                    onChange={this.setUserName}
                />
            </form>
        );
    }
}