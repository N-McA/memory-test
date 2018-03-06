import React, { Component } from 'react';
import './App.css';

import Consent from './Consent.js'
import GiveCode from './GiveCode.js'
import Distractor from './Distractor.js'
import AskCode from './AskCode.js'


class App extends Component {
  currentStateString = 'CONSENT';
  states = {
    'CONSENT': (<Consent consentGiven={() => this.transition('GIVE_CODE')}/>),
    'GIVE_CODE': (<GiveCode next={() => this.transition('DISTRACTOR')}/>),
    'DISTRACTOR': (<Distractor next={() => this.transition('ASK_CODE')}/>),
    'ASK_CODE': (<AskCode/>),
  };
  constructor(props) {
    super(props);
    this.state = {
      pageState: this.states[this.currentStateString],
    }
  }
  transition(stateName) {
    this.setState({
      pageState: this.states[stateName],
    })
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
