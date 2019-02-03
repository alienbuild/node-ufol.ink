import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const Redirect = ({ match }) => (
    <div>
        <h3>{ match.params.hash }</h3>
    </div>
);

class App extends Component {

    state = {
        url: '',
        link: ''
    };

    handleChange = (e) => {
      this.setState({
          url: e.target.value
      })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('URL is: ', this.state.url);
        // Post values
        axios.post('/api/shorten', {
            url: this.state.url
        })
            .then(res => {
                this.setState({
                    link: res.data.hash
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    };



  render() {
    return (
        <Router>
          <div className="App">
              <Route path="/" exact render={() => (
                  <React.Fragment>
                      <form onSubmit={this.handleSubmit}>
                          <input type="text" name="url" onChange={this.handleChange}/>
                          <br />
                          <input type="submit" value="Submit"/>
                      </form>
                      <span id="link">{ this.state.link }</span>
                  </React.Fragment>
              )} />
              <Route path='/:hash' component={Redirect} exact />
          </div>
        </Router>
    );
  }
}

export default App;
