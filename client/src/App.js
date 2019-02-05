import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';
import Redirect from './components/Redirect';
import './aliens.css';

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

    copyResult = (e) => {
        e.preventDefault();
        alert('Sorry, copy function is still in development..');
      // let result = document.getElementById('result');
      // result.focus();
      // result.select();
      //
      // try{
      //     const urlCopy = document.execCommand('copy');
      //     console.log('Copied: ', urlCopy);
      // } catch (err) {
      //     console.log('Hmm...sorry, we weren\'t able to copy the url for you');
      // }
    };

  render() {
    return (
        <Router>
          <div className="container">
              <Route path="/" exact render={() => (
                  <div className="body-wrap">
                      <header>
                          <h1><span className="highlight">ufo</span>l<span className="highlight">.</span>ink</h1>
                          <small>...free and always will be.</small>
                      </header>
                      <main>
                          <form onSubmit={this.handleSubmit}>
                              <fieldset>
                                  <input type="text" name="url" placeholder="Enter URL including the http(s) protocol" onChange={this.handleChange}/>
                                  <input type="submit" value="shorten"/>
                              </fieldset>
                              <br />
                              <fieldset className={this.state.link !== '' ? 'display-result' : 'hide-result'}>
                                  <span id="result">{ this.state.link }</span>
                                  <button id="copy" onClick={this.copyResult}></button>
                              </fieldset>
                          </form>
                      </main>
                  </div>
              )} />
              <Route path="/:hash" component={Redirect} exact />
          </div>
        </Router>
    );
  }
}

export default App;
