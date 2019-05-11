import React from 'react';
import ReactDOM from 'react-dom';

class FirstReactComponent extends React.Component {
    render() {
        return (
            <div>
                <p> hello world from react component </p>
                <p> {this.props.subTitle} </p>
            </div>
        );
    }
}

class SecondReactComponent extends React.Component {
    render() {
        return (
            <div>
                <p> second react component </p>
                {this.props.children}
            </div>
        );
    }
}

const TemplateThree = () => (
    <div>
        <FirstReactComponent subTitle="just passing by" />
    </div>
);

const TemplateFour = () => (
    <div>
        <SecondReactComponent>
            <p>Child component</p>
        </SecondReactComponent>
    </div>
);


export default FirstReactComponent;
// export default SecondReactComponent;
// export default TemplateThree;
// export default TemplateFour;

