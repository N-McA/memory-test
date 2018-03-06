import React, { Component } from 'react';
import './App.css';

import Consent from './Consent.js'
import GiveCode from './GiveCode.js'
import Distractor from './Distractor.js'
import AskCode from './AskCode.js'
import Completed from './Completed.js'

let CODES=['bad fish breath', 'crazy silly nonsense', '07-35-37-23-48']

class App extends Component {
  transition(stateIdx) {
    this.setState({
      currentStateIdx: stateIdx,
      pageState: this.states[stateIdx],
    })
  }
  next = (x) => {
    this.transition(this.state.currentStateIdx + 1)
  }
  prev = () => {
    this.transition(this.state.currentStateIdx - 1)
  }
  states = [
    (<Consent consentGiven={this.next}/>),

    (<GiveCode code={CODES[0]} next={this.next} prev={this.prev}/>),
    (<Distractor next={this.next} prev={this.prev}/>),
    (<AskCode code={CODES[0]} next={this.next} prev={this.prev}/>),
    
    (<GiveCode code={CODES[1]} next={this.next} prev={this.prev}/>),
    (<Distractor next={this.next} prev={this.prev}/>),
    (<AskCode code={CODES[1]} next={this.next} prev={this.prev}/>),

    (<GiveCode code={CODES[2]} next={this.next} prev={this.prev}/>),
    (<Distractor next={this.next} prev={this.prev}/>),
    (<AskCode code={CODES[2]} next={this.next} prev={this.prev}/>),

    (<Completed/>),
  ];
  constructor(props) {
    super(props);
    this.state = {
      pageState: this.states[0],
      currentStateIdx: 0,
    }
  }
  render() {
    return (
      <div className="App">
        {this.state.pageState}
      </div>
    );
  }
}

export default App;
