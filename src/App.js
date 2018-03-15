import React, { Component } from 'react';
import './App.css';

import Consent from './Consent.js'
import GiveCode from './GiveCode.js'
import Distractor from './Distractor.js'
import AskCode from './AskCode.js'
import AskCheat from './AskCheat.js'
import Completed from './Completed.js'
import browserId from './browserId.js'
import {N_FACES, memoryBackend} from './constants.js'

import shajs from 'sha.js'
import {range, zip, shuffle, debounce} from 'lodash'
import {getURLParams} from './utils.js'
window.getURLParams = getURLParams


let CODE_TYPES = [
  'best_model',
  'worst_model',
  'numeric',
]

let CODES=['bad fish breath', 'crazy silly nonsense', '07-35-37-23-48']
let CODE_DICT= {}

function remoteLog(obj) {
  fetch(memoryBackend + '/log', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
}

function getCodes(hash) {
  return fetch(memoryBackend + '/codes/'+hash, {
    method: 'get',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
  })
  .then(x => x.json())
  .then(codeObj => {
    let indices = shuffle(range(CODE_TYPES.length))
    for (let [i, ct] of zip(indices, CODE_TYPES)) {
      CODES[i] = codeObj[ct];
      i ++;
    }
    CODE_DICT = codeObj;
  })
}

function celebPreFetches() {
  let rs = []
  for (let i=0; i<N_FACES; i++) {
    rs.push(
      <link rel="prefetch" href={"static/faces/" + i + ".jpg"} key={i}/>
    )
  }
  return rs
}

window.getCodes = getCodes;

class App extends Component {
  stateLogList = [];
  stateLog = (x, force=false) => {
    x['time'] = (new Date()).getTime();
    x['browserId'] = browserId();
    x['codes'] = CODE_DICT;
    this.stateLogList.push(x);
    if (x.type === 'ATTEMPT' || force)
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
    (<Consent consentGiven={debounce(this.gotConsent, 500)}/>),

    (<GiveCode code={() => CODES[0]} next={this.next} prev={this.prev}/>),
    (<Distractor next={this.next} prev={this.prev}/>),
    (<AskCode stateLog={this.stateLog} code={() => CODES[0]} next={this.next} prev={this.prev}/>),
    
    (<GiveCode code={() => CODES[1]} next={this.next} prev={this.prev}/>),
    (<Distractor next={this.next} prev={this.prev}/>),
    (<AskCode stateLog={this.stateLog} code={() => CODES[1]} next={this.next} prev={this.prev}/>),

    (<GiveCode code={() => CODES[2]} next={this.next} prev={this.prev}/>),
    (<Distractor next={this.next} prev={this.prev}/>),
    (<AskCode stateLog={this.stateLog} code={() => CODES[2]} next={this.next} prev={this.prev}/>),

    (<AskCheat next={this.next} stateLog={this.stateLog}/>),
    (<Completed/>),
  ];
  constructor(props) {
    super(props);
    this.state = {
      pageState: this.states[0],
      currentStateIdx: 0,
    }
    // Hacks to make debugging more pleasant.
    window.next = this.next
    window.prev = this.prev
    window.CODES = CODES
  }
  render() {
    return (
      <div className="App">
        {this.state.pageState}
        {celebPreFetches()}
      </div>
    );
  }
}

export default App;
