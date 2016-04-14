import React from 'react';
import {render} from 'react-dom';
import store from './store/FactsData';
//for demo
import FactsActions from './actions/FactsActions';

class App extends React.Component {
  constructor() { 
    super();
    this.state = {};
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    store.addChangeListener(this.onChange);
}

  componentWillUnmount() {
    store.removeChangeListener(this.onChange);
  }
  
  onChange() { 
    this.setState({ });     
   }

  render () {
    return <span>Please, wait!!</span>  }
}

render(<App/>, document.getElementById('app'));


