
import React, { Component } from 'react';
import { getURLParams } from './utils.js';


class Completed extends Component {
  constructor(props) {
    super(props);
    this.urlParams = getURLParams()
  }
  render() {
    return (
      <div className="Completed">
        <form 
          id="turkSubmit" 
          action={this.urlParams.turkSubmitTo + "/mturk/externalSubmit"} 
          method="post">
            <input type="hidden" name="assignmentId" id="assignmentId" value={this.urlParams.assignmentId}/>
            <input type="submit" value="Click to Complete Experiment" name="submitButton" id="completeButton" />
        </form>
      </div>
    );
  }
}

export default Completed;
