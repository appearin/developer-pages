import React from 'react';
import autoBind from 'react-autobind';

class ProcessViewComponent extends React.Component{

  constructor(props){
    super(props);
    autoBind(this);
    this.state = {
      step: props.data[0],
      stepIndex: 0
    };
  }

  render(){
    let stepNodes = this.props.data.map((step, index)=> {
      if(index === this.props.stepIndex){
        return(
        <li className="register-process-step active-step" ><h3>{step}</h3></li>
      );
      }
      return(
        <li className="register-process-step unactive-step" ><h3>{step}</h3></li>
      );
    });

    return(
      <div>
        {stepNodes}
      </div>
    );
  }

}

export default ProcessViewComponent;
