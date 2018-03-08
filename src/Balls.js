
import React, { Component } from 'react';
import './Balls.css'


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
      remainingClicks: 10,
      selectedButton: randomInt(9),
    };
  };

  wacked = () => {
    this.setState({
      remainingClicks: this.state.remainingClicks - 1,
      selectedButton: randomOtherInt(9, this.state.selectedButton),
    })
    // bloody async, init.
    if (this.state.remainingClicks - 1 === 0) {
      this.props.onComplete()
    }
  }

  render() {
    return (
      <div>
        <h3>Click Cage!</h3>
        <h3>{Math.max(this.state.remainingClicks, 0)} CageClicks remaining...</h3>
        <div className="container">
          {
            range(N_BUTTONS).map(i => (
              <div className="item" key={i.toString()}
                  style={vis(i === this.state.selectedButton)}>
                <input 
                  className="image-button"
                  type="image" 
                  alt="cage"
                  src="static/nick-face.png"
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
