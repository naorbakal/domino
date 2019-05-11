import React from 'react';
import ReactDOM from 'react-dom';

const UseFunctionalComponent = (props) => {
    const clickHandler = () =>{
       console.log('clicked'); 
    }
    return (
        <div onClick={clickHandler} >hello {props.name}</div>
    );
}

export default UseFunctionalComponent;