import React, { Component } from 'react';
import './App.css';

import Consent from './Consent.js'
import GiveCode from './GiveCode.js'
import Distractor from './Distractor.js'
import AskCode from './AskCode.js'
import Completed from './Completed.js'
import shajs from 'sha.js'


let CODE_TYPES = [
  'best_model',
  'worst_model',
  'numeric',
]

let CODES=['bad fish breath', 'crazy silly nonsense', '07-35-37-23-48']

function remoteLog(obj) {
  fetch(':5000/log', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
}

function getCodes(hash) {
  console.log(hash)
  return fetch('http://localhost:5000/codes/'+hash, {
    method: 'get',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
  })
  .then(x => x.json())
  .then(codeObj => {
    let i = 0;
    for (let ct of CODE_TYPES) {
      CODES[i] = codeObj[ct];
      i ++;
    }
  })
}

window.getCodes = getCodes;

class App extends Component {
  stateLogList = [];
  stateLog = (x) => {
    x['time'] = (new Date()).getTime();
    this.stateLogList.push(x);
    if (x.type === 'ATTEMPT')
      remoteLog(this.stateLogList);
  };
  transition(stateIdx) {
    this.setState({
      currentStateIdx: stateIdx,
      pageState: this.states[stateIdx],
    })
    this.stateLog({
      type: 'TRANSITION',
      data: {
        from: this.state.currentStateIdx,
        to: stateIdx,
      },
      ready: false,
    })
  }
  next = (x) => {
    this.transition(this.state.currentStateIdx + 1)
  }
  prev = () => {
    this.transition(this.state.currentStateIdx - 1)
  }
  gotConsent = (crsid) => {
    let hash = shajs('sha256').update(crsid).digest('hex');
    getCodes(hash)
      .then(() => {
        this.next()
      })
  }
  states = [
    (<Consent consentGiven={this.gotConsent}/>),

    (<GiveCode code={() => CODES[0]} next={this.next} prev={this.prev}/>),
    (<Distractor next={this.next} prev={this.prev}/>),
    (<AskCode stateLog={this.stateLog} code={() => CODES[0]} next={this.next} prev={this.prev}/>),
    
    (<GiveCode code={() => CODES[1]} next={this.next} prev={this.prev}/>),
    (<Distractor next={this.next} prev={this.prev}/>),
    (<AskCode stateLog={this.stateLog} code={() => CODES[1]} next={this.next} prev={this.prev}/>),

    (<GiveCode code={() => CODES[2]} next={this.next} prev={this.prev}/>),
    (<Distractor next={this.next} prev={this.prev}/>),
    (<AskCode stateLog={this.stateLog} code={() => CODES[2]} next={this.next} prev={this.prev}/>),

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
