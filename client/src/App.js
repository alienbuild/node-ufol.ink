import React, { Component } from 'react';
import axios from 'axios';
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
      <div className="App">
          <form onSubmit={this.handleSubmit}>
              <input type="text" name="url" onChange={this.handleChange}/>
              <br />
              <input type="submit" value="Submit"/>
          </form>
      </div>
    );
  }
}

export default App;
