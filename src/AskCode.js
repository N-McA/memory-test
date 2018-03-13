
import React, { Component } from 'react';

function normalise(s) {
  return s.toLowerCase().replace(/-/g, '').replace(/ /g, '');
}

class CodeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      correct: false,
      failed: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log('A name was submitted: ' + this.state.value);
    event.preventDefault();
    console.log(this.props)
    let submitted = normalise(this.state.value)
    let target = normalise(this.props.target)
    if (submitted === target) {
      this.setState({correct: true});
      this.props.stateLog({
        type: 'ATTEMPT',
        data: {
          submitted: this.state.value,
          target: this.props.target,
          success: true,
        }, 
      })
    } else {
      this.setState({failed: true});
      this.props.stateLog({
        type: 'ATTEMPT',
        data: {
          submitted: this.state.value,
          target: this.props.target,
          success: false,
        }, 
      })
    }

    console.log(this.props.stateLog)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Code:
            <input 
              autoFocus
              className="text-box" 
              type="text" value={this.state.value} 
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>

        {this.state.failed &&
          (<div>
            <p>Incorrect!</p>
            <p>Please keep going. This is for science!</p>
            <button onClick={this.props.next}>Next</button>
          </div>)
        }

        {this.state.correct &&
          (<div>
            <p>Nice one!</p>
            <p>Press Next to continue.</p>
            <button onClick={this.props.next}>Next</button>
          </div>)
        }
      </div>
    );
  }
}

class AskCode extends Component {
  render() {
    return (
      <div className="AskCode">

        <h2>
          Please enter the last code you recieved.
        </h2>
        <p>Case (capitalisation) doesn't matter; you can skip "-"s too.</p>

        <CodeForm stateLog={this.props.stateLog} target={this.props.code()} next={this.props.next} prev={this.props.prev}/>

      </div>
    );
  }
}

export default AskCode;
