import React from 'react';
import ReactDOM from 'react-dom';

/* simple JSX */
const template = (<p> this is a JSX template </p>);


/* JSX with expressions */
const person = {
    name: "Moshe",
    age: 45,
    address: "Tel-Aviv"
};

function getPersonsAge(person) {
    return person.age;
}

const templateTwo = (
    <div>
        <h1>Persons info</h1>
        <p>persons name: {person.name}</p>
        <p>persons age: {getPersonsAge(person)} </p>
        {person.address ? <p>presons address: {person.address}</p> : null}
    </div>
)


/* JSX with Arrays */
const persons = [
    { name: "Moshe" },
    { name: "Haim" }
];

const templateThree = (
    <ul>
        {persons.map((person) => (<li key={person.name}>persons name: {person.name}</li>))}
    </ul>
)


const Template = () => template;
// const Template = () => templateTwo;
// const Template = () => templateThree;

export default Template;