import React from 'react';
import autoBind from 'react-autobind';

class RegisterComponent extends React.Component{

  constructor(props){
    super(props);
    autoBind(this);
    this.state = { userData: {} };
  }

  onRegister(event){
    event.preventDefault();

    let userData = JSON.stringify(this.getFormValues(event.target));

    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: userData
    })
    .then((res)=> {
      return res.text();
    })
    .then((key)=> {
      this.props.onSuccess(key);
    });

  }

  getFormValues(targetForm){
    return {
      name: targetForm.children[0].value,
      email: targetForm.children[3].value,
      domain: targetForm.children[6].value
    };
  }

  render(){
    return(
        <form onSubmit={this.onRegister} >
          <input type="text" placeholder="Name"/><br/><br/>
          <input type="text" placeholder="Email"/><br/><br/>
          <input type="text" placeholder="Domain"/><br/><br/>
          <input type="submit" />
        </form>
    );
  }
}

export default RegisterComponent;
