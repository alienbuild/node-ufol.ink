import React, {Component} from 'react';
import axios from "axios";

class Redirect extends Component {

    // Init state
    state = {
        redirectURL: ''
    };

    componentDidMount() {
        const hash = this.props.match.params.hash;

        axios.get('/api/redirect',{
            headers: {
                hash
            }
        })
        .then(res => {
            console.log(res.data);
            if (res.data.url) {
                window.location.replace(res.data.url);
            }

        })
        .catch(err => {
            this.setState({
                redirectURL: 'URL Not found'
            })
        });

    }

    render() {
        return (
            <div>
                <p>{this.state.redirectURL}</p>
            </div>
        );
    }
}

export default Redirect;