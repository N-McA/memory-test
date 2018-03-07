
import React, { Component } from 'react';

class Consent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      correct: false,
      failed: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = () => {
    if (this.state.value === "") {
      alert(
        'You must provide an email. It is only used locally.')
    } else {
      this.props.consentGiven(this.state.value)
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  render() {
    return (
      <div className="Consent">
        <h1>Consent</h1>

        <p>
          This website is an experiment designed to test the memorability of different encodings of arbitrary information.
        </p>

        <p>
          The experiment is designed to be straightforward and fun. 
          Your results will be associated with a unique pseudonymous identifier, 
          and no data recorded contains personally identifying information.
        </p>

        <p>
          Participation is completely voluntary and at your own discretion. 
          You may stop at any time; for any reason.
          There is no penalty, and this does not affect your legal rights.
        </p>

        <p>
          Some portions of the experiment include randomly generated sequences of words. 
          Because of random generation, some sequences might seem to have meaning or purpose. 
          They do not.
        </p>

        <p>Please enter your CRSID:</p>
        <form>
          <input className='email-box' type="text" value={this.state.value} onChange={this.handleChange} />
        </form>
        <br/>
        <button onClick={this.handleSubmit}> I understand and wish to continue. </button>
      </div>
    );
  }
}

export default Consent;
