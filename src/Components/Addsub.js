
import React, {Component} from 'react';
import SubDataService from "../Services/Subservice";


export default class Addsub extends Component {
   
 
  constructor(props){
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangePassword= this.onChangePassword.bind(this);
        this.onChangeDate=this.onChangeDate.bind(this);
        this.saveSubscription = this.saveSubscription.bind(this);
        this.newSubscription = this.newSubscription.bind(this);
        this.state={
            id:null,
            title:" ",
            amount: " ",
            password:" ",
            date:" ",
            published:false,
            submitted:false
        };
    }
    onChangeTitle(e){
        this.setState({
            title:e.target.value
        });
    }
    onChangeAmount(e){
        this.setState({
            amount:e.target.value
    });
}
onChangePassword(e){
    this.setState({
        password:e.target.value
    });
}
onChangeDate(e){
  this.setState({
      date:e.target.value
  });
}

saveSubscription(){
    var data ={
        title:this.state.title,
        amount:this.state.amount,
        password:this.state.password,
        date:this.state.date , 
    };
    SubDataService.create(data)
    .then(response=>{
        this.setState({
            id: response.data.id,
            title: response.data.title,
            amount:response.data.amount,
            password:response.data.password,
            date:response.data.date,
            published: response.data.published,
            submitted: true
        }) ; 
        console.log(response.data);
    })
    .catch(e=>{
        console.log(e);
    });
}
newSubscription(){
    this.setState({
        id:null,
        title:" ",
        amount: " ",
        password: " ",
        date:" ",
        published: false,
        submitted:false,
    });
}
   render(){
       return(
       <div className="submit-form">
    {this.state.submitted ? (
      <div>
        <h4>You submitted successfully!</h4>
        <button className="btn btn-success" onClick={this.newSubscription}>
          Add
        </button>
      </div>
    ) : (
      <div>
        <div className="form-group">
          <label htmlFor="title">Name of the site</label>
          <input
            type="text"
            className="form-control"
            id="title"
            required
            value={this.state.title}
            onChange={this.onChangeTitle}
            name="title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="Amount">Amount</label>
          <input
            type="text"
            className="form-control"
            id="Amount"
            required
            value={this.state.amount}
            onChange={this.onChangeAmount}
            name="Amount"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Password">Password</label>
          <input
            type="text"
            className="form-control"
            id="Password"
            required
            value={this.state.password}
            onChange={this.onChangePassword}
            name="Password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Date">Next bill roll date</label>
          <input
            type="text"
            className="form-control"
            id="Date"
            required
            value={this.state.date}
            onChange={this.onChangeDate}
            name="Date"
          />
        </div>
        <button onClick={this.saveSubscription} className="btn btn-success">
          Submit
        </button>
      </div>
    )}
  </div>
);
}
}




  


