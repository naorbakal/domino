import React from 'react';
import ReactDOM from 'react-dom';

class FragmentsExample extends React.Component {
    constructor(props) {
        super(props);
    }

    renderItem(item) {
        return (
            <> {/* <- shortcut for <React.Fragment>*/}
                <p>{item.name}</p>
                <p>{item.age}</p>
            </> 
        );
    }

    renderItems() {
        const {items} = this.props;

        return items.map(item => <li key={item.name+item.age}>
            {this.renderItem(item)}
            </li>
        );
    }

    render() {
        return (
            <ul>
                {this.renderItems()}
            </ul>
        );
    }
}



export default FragmentsExample;

