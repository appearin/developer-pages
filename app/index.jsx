import React from 'react';
import {render} from 'react-dom';
import RegisterComponent from './RegisterComponent.jsx';
import KeyComponent from './KeyComponent.jsx';
import autoBind from 'react-autobind';
import ProcessViewComponent from './ProcessViewComponent.jsx';

class App extends React.Component {

  constructor(props){
    super(props);
    autoBind(this);

    this.state = {
      stepNames: ['Register', 'Get your key'],
      stepIndex: 0,
      selectedTab:
        <RegisterComponent
          setKey={this.setKeyValue}
          onSuccess={this.onRegister}/>
      };
  }

  /* When registering the request return a apiKey */
  onRegister(keyVal){
    this.setKeyTab(keyVal);
  }

  setRegisterTab(){
    this.setState({selectedTab:
      <RegisterComponent
        setKey={this.setKeyValue}
        onRegisterAndRetrieveKey={this.onRegisterAndRetrieveKey}/>
    });
  }

  setKeyTab(keyVal){
    this.setState({selectedTab:
      <KeyComponent apiKey={keyVal} />,
      stepIndex: 1
    });
  }

  render(){
    return(
        <div>
          <ProcessViewComponent
            stepIndex={this.state.stepIndex}
            data={this.state.stepNames} />
              { this.state.selectedTab }
        </div>
    );
  }
}


render(<App/>, document.getElementById("app"));
