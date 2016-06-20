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
    let userData = this.getFormValues(event.target);

    $.ajax({
      type: 'POST',
      url: '/register',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(userData),
      success: (res, textStatus, xhr)=>{
        console.log(res);
        this.props.onSubmit(res);
      },
      error: (xhr, status, err)=>{
        console.log(err);
      }
    })
    .then((key)=>{
      this.props.onSubmit(key);
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
