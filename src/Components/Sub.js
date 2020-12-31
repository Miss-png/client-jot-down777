import React , {Component} from 'react';
import SubDataService from "../Services/Subservice";

export default class  sub extends Component{
    constructor(props){
        super(props);
  this.onChangeTitle = this.onChangeTitle.bind(this);
  this.onChangeAmount = this.onChangeAmount.bind(this);
  this.onChangePassword= this.onChangePassword.bind(this);
  this.onChangeDate=this.onChangeDate.bind(this);
  this.getSubscription = this.getSubscription.bind(this);
  this.updatePublished= this.updatePublished.bind(this);
  this.updateSubscription=this.updateSubscription.bind(this);
  this.deleteSubscription= this.deleteSubscription.bind(this);
  this.state={
      currentSubscription:{
          id:null,
          title: " ",
          amount: " ",
          password: " ",
          date:" ",
          published: false
      },
      message:""
    };
}
componentDidMount() {
    this.getSubscription(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title= e.target.value;

    this.setState(function(prevState) {
      return {
        currentSubscription: {
          ...prevState.currentSubscription,
         title:title
        }
      };
    });
  }

  onChangeAmount(e) {
    const amount = e.target.value;
    
    this.setState(prevState => ({
      currentSubscription: {
        ...prevState.currentSubscription,
        amount: amount
      }
    }));
  }
  onChangePassword(e) {
    const password = e.target.value;
    
    this.setState(prevState => ({
      currentSubscription: {
        ...prevState.currentSubscription,
        password: password
      }
    }));
  }
  onChangeDate(e) {
    const date = e.target.value;
    
    this.setState(prevState => ({
      currentSubscription: {
        ...prevState.currentSubscription,
        date:date
      }
    }));
  }

  getSubscription(id) {
    SubDataService.get(id)
      .then(response => {
        this.setState({
          currentSubscription: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentSubscription.id,
      title: this.state.currentSubscription.title,
      amount: this.state.currentSubscription.amount,
      password: this.state.currentSubscription.password,
      date:this.state.currentSubscription.date,
      published: status
    };

    SubDataService.update(this.state.currentSubscription.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentSubscription: {
            ...prevState.currentSubscription,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateSubscription() {
    SubDataService.update(
      this.state.currentSubscription.id,
      this.state.currentSubscription
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Subcriptions were successfully updated!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteSubscription() {    
    SubDataService.delete(this.state.currentSubscription.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/subcriptions')
      })
      .catch(e => {
        console.log(e);
      });
  }
  render(){

  const{currentSubscription}= this.state;
  return(
    <div>
    {currentSubscription ? (
      <div className="edit-form">
        <h4>List of Subscriptions</h4>
        <form>
          <div className="form-group">
            <label htmlFor="title">Subscription</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={currentSubscription.title}
              onChange={this.onChangeTitle}
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="text"
              className="form-control"
              id="amount"
              value={currentSubscription.amount}
              onChange={this.onChangeAmount}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Password">Password</label>
            <input
              type="text"
              className="form-control"
              id="password"
              value={currentSubscription.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Date">Next bill roll date</label>
            <input
              type="text"
              className="form-control"
              id="date"
              value={currentSubscription.date}
              onChange={this.onChangeDate}
            />
          </div>
          <div className="form-group">
            <label>
              <strong>Status:</strong>
            </label>
            {currentSubscription.published ? "Paid" : "Awaits payment"}
          </div>
        </form>

        {currentSubscription.published ? (
          <button
            className="badge badge-primary mr-2"
            onClick={() => this.updatePublished(false)}
          >
            Not paid
          </button>
        ) : (
          <button
            className="badge badge-primary mr-2"
            onClick={() => this.updatePublished(true)}
          >
            Paid
          </button>
        )}

        <button
          className="badge badge-danger mr-2"
          onClick={this.deleteSubscription}
        >
          Delete
        </button>

        <button
          type="submit"
          className="badge badge-success"
          onClick={this.updateSubscription}
        >
          Update
        </button>
        <p>{this.state.message}</p>
      </div>
    ) : (
      <div>
        <br />
        <p>Please select a Subscription...</p>
      </div>
    )}
  </div>
);
}
}


