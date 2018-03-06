
import React, { Component } from 'react';

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
    let submitted = this.state.value.toLowerCase();
    if (submitted === this.props.target) {
      this.setState({correct: true});
    } else {
      this.setState({failed: true});
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Code:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>

        {this.state.failed &&
          (<div>
            <p>Incorrect!</p>
            <p>Note that you can go back to remind yourself, and you must enter the code correctly to continue with the experiment.</p>
            <button onClick={this.props.prev}>Previous</button>
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

        <CodeForm target={this.props.code} next={this.props.next} prev={this.props.prev}/>

      </div>
    );
  }
}

export default AskCode;
