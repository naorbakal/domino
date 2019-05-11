import React from 'react';
import ReactDOM from 'react-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return {error: error};
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('custom appliction error:',error.message, errorInfo.componentStack);
  }
  
  render() {
    if (this.state.error) {
      return (
        <h2>Something went wrong.</h2>
      );
    }
    return this.props.children;
  }  
}

class Buggy extends React.Component {
  constructor(props) {
    super(props);
    this.state = { throwError: false };
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState({throwError: true});
  }
  
  render() {
    if (this.state.throwError) {
      throw new Error('I crashed!');
    }
    return <button onClick={this.handleClick}>Click To simulate JS render Error</button>;
  }
}

function ErrorBoundariesExample() {
  return (
    <div>
      <ErrorBoundary>
        <Buggy />
      </ErrorBoundary>
    </div>
  );
}

export default ErrorBoundariesExample;

