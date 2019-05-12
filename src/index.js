import React from 'react';
import ReactDOM from 'react-dom';
import Wrapper from './wrapper.js';
import background from "./gameBackground.jpg";

/* Directly adding react element */
// ReactDOM.render(
//     React.createElement('div',null, 'hello world from react '), 
//     document.getElementById("root")
// );

const App = () => (
    <Wrapper />
);

ReactDOM.render(<App />, document.getElementById("root"));
