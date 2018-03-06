
import React, { Component } from 'react';

class AskCode extends Component {
  render() {
    return (
      <div className="AskCode">
        <h1>AskCode</h1>

        <p>
          Please inspect the following code.
        </p>

        <p>
          You will later be asked to recall this code.
        </p>

        <button onClick={this.props.prev}>Previous</button>
        <button onClick={this.props.next}>Next</button>

      </div>
    );
  }
}

export default AskCode;
