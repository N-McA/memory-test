
import React, { Component } from 'react';
import { getURLParams } from './utils.js';

function amazonSubmit(obj) {
  let params = getURLParams()
  let url = params.turkSubmitTo 
  url = url + '/mturk/externalSubmit'
  url = url + '?assignmentId=' + params.assignmentId
  let body = "data=" + JSON.stringify(obj);
  return fetch(url, {
    method: 'post',
    // headers: {
    //   'Accept': 'application/json, text/plain, */*',
    //   'Content-Type': 'application/json'
    // },
    body: body,
  })
}

function sendData(logObj) {
  return amazonSubmit(logObj)
}

class Completed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false
    }
    sendData()
      .then(() => this.setState({ready: true}))
  }
  render() {
    return (
      <div className="Completed">
        {
          this.state.ready &&
          (<div>
          <h1>Experiment Completed!</h1>
          <p>
            Thank you for your participation!
          </p>

          <p>
            Your results will contribute to science.
          </p>

          <p>
            Please contact Nat McAleese (nm583) if you have any questions.
          </p>
          </div>)
        }
      </div>
    );
  }
}

export default Completed;
