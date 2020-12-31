import React , {Component} from 'react';
import SubDataService from "../Services/Subservice";
import {Link} from "react-router-dom";


export default class Sublist extends Component {
    constructor(props){
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);   
    this.retrieveSubscriptions= this.retrieveSubscriptions.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveSubscription = this.setActiveSubscription.bind(this);
    this.removeAllSubscriptions = this.removeAllSubscriptions.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
   
    this.state={
        susbcriptions:[],
        currentSubscription: null,
        currentIndex:-1, 
      searchTitle:" "
    };
    }
    componentDidMount() {
      this.retrieveSubscriptions();
    }
    onChangeSearchTitle(e) {
      const searchTitle = e.target.value;
  
      this.setState({
        searchTitle: searchTitle
      });
    }
  
    retrieveSubscriptions(){
        SubDataService.getAll().then(response=>{
            this.setState({
                subscriptions:response.data
            });
            console.log(response.data);
        })
        .catch(e=>{
            console.log(e);
        });
    }
    refreshList(){
        this.retrieveSubscriptions();
        this.setState({
            curentSubscription:null,
            currentIndex:-1,
        });
    }
    setActiveSubscription(subscription, index){
        this.setState({
            currentSubscription: subscription,
            currentIndex: index
        });
    }
    removeAllSubscriptions() {
        SubDataService.deleteAll()
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
      }
      searchTitle() {
        SubDataService.findByTitle(this.state.searchTitle)
          .then(response => {
            this.setState({
              subscriptions: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    
   
        render(){
            const {  searchTitle, subscriptions, currentSubscription, currentIndex } = this.state;

            return (
              <div className="list row">
              <div className="col-md-8">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by title"
                    value={searchTitle}
                    onChange={this.onChangeSearchTitle}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={this.searchTitle}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
                <div className="col-md-6">
                  <h4>Subscriptions List</h4>
        
                  <ul className="list-group">
                    {subscriptions &&
                      subscriptions.map((subscription, index) => (
                        <li
                          className={
                            "list-group-item " +
                            (index === currentIndex ? "active" : "")
                          }
                          onClick={() => this.setActiveSubscription(subscription, index)}
                          key={index}
                        >
                          {subscription.title}
                        </li>
                      ))}
                  </ul>
        
                  <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={this.removeAllSubscriptions}
                  >
                    Delete All
                  </button>
                </div>
                <div className="col-md-6">
                  {currentSubscription ? (
                    <div>
                      <h4>Subscription</h4>
                      <div>
                        <label>
                          <strong>Title:</strong>
                        </label>{" "}
                        {currentSubscription.title}
                      </div>
                          <div>
                        <label>
                          <strong>Amount:</strong>
                        </label>{" "}
                        {currentSubscription.amount}
                      </div>
                      <div>
                      <label>
                          <strong>Password:</strong>
                        </label>{" "}
                        {currentSubscription.password}
                      </div>
                      <div>
                      <label>
                          <strong>Date:</strong>
                        </label>{" "}
                        {currentSubscription.date}
                      </div>
                      <div>
                        <label>
                          <strong>Status:</strong>
                        </label>{" "}
                        {currentSubscription.published ? "Paid" : "Awaits payment"}
                      </div>
                      <Link
                        to={"/subscriptions/" + currentSubscription.id}
                        className="badge badge-warning"
                      >
                        Edit
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <br />
                      <p>Please select Subscription...</p>
                    </div>
                  )}
                </div>
              </div>
            );

}
}
