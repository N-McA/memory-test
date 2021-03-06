
import React, { Component } from 'react';
import {getURLParams} from './utils.js'

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

  handleSubmit = (e) => {
    e.preventDefault();
    let params = getURLParams()
    let assId = params.assignmentId
    if (!assId) {
      alert('Not publically available at the moment.')
    } else if (assId === 'ASSIGNMENT_ID_NOT_AVAILABLE') {
      alert('You must accept the task to continue.')
    } else {
      this.props.consentGiven(assId);
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  render() {
    return (
      <div className="Consent">
        <h1>Memory Test</h1>
        <h2>Consent</h2>
        <p>
          This website is an experiment designed to test the memorability of different encodings of arbitrary information.
        </p>

        <h4>
          For most people, it takes less than five minutes!
        </h4>

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

        <form>
          <div className="consent-button-wrapper">
            <input 
              type="submit" 
              onClick={this.handleSubmit} 
              value="I understand and wish to continue."
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Consent;
