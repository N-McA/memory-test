
import React, { Component } from 'react';
import Balls from './Balls.js'

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
        <Balls onComplete={() => this.setState({completed: true})}/>
        <button onClick={this.props.prev}>Previous</button>
        {this.state.completed && <button onClick={this.props.next}>Next</button>}
      </div>
    );
  }
}

export default Distractor;
