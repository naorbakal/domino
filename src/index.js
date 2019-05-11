import React from 'react';
import ReactDOM from 'react-dom';

import SimpleJSX from './JSX/simpleJSX';
import Components from './JSX/components';
import DefaultProps from './JSX/defaultProps';
import Fragments from './JSX/fragments';
import StateManagement from './JSX/stateManagement';
import StatelessFunctionalComponents from './JSX/statelessFunctionalComponents'

import ErrorBoundries from './ComponentLifecycle/errorBoundaries.jsx';

import Controlled from './Controlled Components/controlled';
import Uncontrolled from './Controlled Components/uncontrolled';


/* Directly adding react element */
// ReactDOM.render(
//     React.createElement('div',null, 'hello world from react '), 
//     document.getElementById("root")
// );

const App = () => (
    <div>
        <SimpleJSX />
        {/* <Components subTitle="qwerty"/> */}
        {/* <DefaultProps /> */}
        {/* <Fragments items={[{name: "Moshe", age:52},{name: "Chaim", age: 46}]} /> */}
        {/* <StateManagement /> */}
        {/* <StatelessFunctionalComponents name="Anya"/> */}
        {/* <ErrorBoundries /> */}
        {/* <Controlled /> */}
        {/* <Uncontrolled /> */}
    </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
