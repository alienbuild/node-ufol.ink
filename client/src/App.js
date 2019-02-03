import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';

import Redirect from './components/Redirect';
import './App.css';

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
        const validURL = validator.isURL(this.state.url, {
            require_protocol: true
        });
        if (!validURL) {
            alert('Please ensure the url is correct and includes the http(s) protocol.');
        } else{
            console.log('URL is: ', this.state.url);
            // Post values
            axios.post('/api/shorten', {
                url: this.state.url
            })
                .then(res => {
                    this.setState({
                        link: `http://ufol.ink/${res.data.hash}`
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
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
              <Route path="/:hash" component={Redirect} exact />
          </div>
        </Router>
    );
  }
}

export default App;
