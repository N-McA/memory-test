
import React, { Component } from 'react';

class Consent extends Component {
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

        <button onClick={this.props.consentGiven}> I understand and wish to continue. </button>
      </div>
    );
  }
}

export default Consent;
