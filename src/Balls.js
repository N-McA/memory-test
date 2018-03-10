
import React, { Component } from 'react';
import './Balls.css'
import {N_FACES} from './constants.js'

function range(x) {
  let rs = []
  for (let i=0; i<x; i++) rs.push(i)
  return rs
}

function randomInt(max) {
  return Math.floor(Math.random() * (Math.floor(max)));
}

function randomOtherInt(max, excluded) {
  let r = excluded
  while (r === excluded) r = randomInt(max);
  return r
}

const N_BUTTONS = 9

function vis(p) {
  if (p) {
    return {}
  } else {
    return {visibility: 'hidden'}
  }
}

export default class Balls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remainingClicks: 15,
      selectedButton: randomInt(9),
      selectedFace: randomInt(N_FACES),
    };
  };

  wacked = () => {
    this.setState({
      remainingClicks: this.state.remainingClicks - 1,
      selectedButton: randomOtherInt(9, this.state.selectedButton),
      selectedFace: randomOtherInt(N_FACES, this.state.selectedFace),
    })
    // bloody async, init.
    if (this.state.remainingClicks - 1 === 0) {
      this.props.onComplete()
    }
  }

  render() {
    return (
      <div>
        <h3>Click the celebrities!</h3>
        <h3>{Math.max(this.state.remainingClicks, 0)} Clicks remaining...</h3>
        <div className="container">
          {
            range(N_BUTTONS).map(i => (
              <div className="item" key={i.toString()}
                  style={vis(i === this.state.selectedButton)}>
                <input 
                  className="image-button"
                  type="image" 
                  alt="cage"
                  src={"static/faces/" + this.state.selectedFace + ".jpg"}
                  onClick={this.wacked}
                />
              </div>
            ))
          }
        </div>
      </div>
    );
  };
}
