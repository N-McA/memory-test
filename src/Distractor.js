
import React, { Component } from 'react';

class Distractor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      completed: false,
    }
  }
  render() {
    return (
      <div className="Distractor">
        <h1>Game</h1>

        <p>
          Move the blue boxes into the red boxes.
        </p>

        <button onClick={() => this.setState({completed: true})}>play</button>
        {this.state.completed && <button onClick={this.props.next}>Next</button>}

      </div>
    );
  }
}

export default Distractor;
