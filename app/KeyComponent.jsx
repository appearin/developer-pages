import React from 'react';
import autoBind from 'react-autobind';

class KeyComponent extends React.Component {

  constructor(props){
    super(props);
    autoBind(this);
    console.log(props);
  }

  render(){
    return(
      <div className="key" >Your key :{this.props.apiKey}</div>
    );
  }

}

export default KeyComponent;
