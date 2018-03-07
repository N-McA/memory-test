
import React, { Component } from 'react';

class GiveCode extends Component {
  constructor(props) {
    super(props);
    console.log('created')
  }
  render() {
    return (
      <div className="GiveCode">

        <p>
          Please inspect the following code.
        </p>

        <h2>{this.props.code()}</h2>

        <p>
          You will later be asked to recall this code.
        </p>

        <button onClick={this.props.prev}>Previous</button>
        <button onClick={this.props.next}>Next</button>

      </div>
    );
  }
}

export default GiveCode;
