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
    this.registerTabName = "Register";
    this.getKeyTabName = "Get key";
    this.registerTabText = "Register";
    this.getKeyTabText = "Get key";


    this.state = {
      stepNames: ['Register', 'Get your key'],
      selectedTab:
        <RegisterComponent
        setKey={this.setKeyValue}
        onSubmit={this.onSubmit}/>,
      stepIndex: 0
      }
  }

  onSubmit(keyVal){
    this.setKeyTab(keyVal);
  }

  setRegisterTab(){
    this.setState({selectedTab:
      <RegisterComponent
      setKey={this.setKeyValue}
      onSubmit={this.onSubmit}/>
    });
  }

  setKeyTab(keyVal){
    console.log("Setting key tab");
    console.log(keyVal);
    this.setState({selectedTab:
      <KeyComponent apiKey={keyVal} />,
      stepIndex: 1
    });
  }

  render(){
    return(
        <div>
          <ProcessViewComponent stepIndex={this.state.stepIndex} data={this.state.stepNames} />
          { this.state.selectedTab }
        </div>
    );
  }
}


render(<App/>, document.getElementById("app"));
