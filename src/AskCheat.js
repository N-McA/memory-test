
import React, { Component } from 'react';

export default class AskCheat extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  render() {
    return (
      <div>
        <h3>Did you write down or otherwise record the codes?</h3>
        <h3>There is no penalty for saying yes.</h3>
        <button onClick={() => {
          this.props.stateLog({
            type: 'ASK_CHEATED',
            data: {
              cheated: true
            },
          }, true);
          this.props.next();
        }}>Yes, I wrote them down.</button>
        <button onClick={() => {
          this.props.stateLog({
            type: 'ASK_CHEATED',
            data: {
              cheated: false
            },
          }, true);
          this.props.next();
        }}>No, I tried to remember them.</button>
      </div>
    );
  }
}
