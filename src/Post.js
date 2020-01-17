import React, { Component } from "react";
import axios from "axios";

export default class Comment extends Component {
    state = {
        title: '',
        body: '',
        button: 'Submit Post',
        result: '',
    }

    handleChange = event => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({button: 'Processing...'});
        const post = {
          title: this.state.title,
          body: this.state.body,
        };
    
        //clear the form elements
        this.setState({
            title: '',
            body: '',
          });
        axios.post(`https://jsonplaceholder.typicode.com/posts`, { post })
          .then(res => {
            console.log(res);
            console.log(res.data);
            this.setState({
                result: "Success - New post id:" + res.data.id,
                button: 'Submit Post'
            });
          })
        }

    render() {
        return (
        <div className="form-group">
            <h2>Post</h2>
            <p>Complete the form below and submit your post</p>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                </label>
                <label>
                    Body:
                    <textarea name="body" value={this.state.body} onChange={this.handleChange} />
                </label>
                <button type="submit" disabled={this.state.button !== 'Submit Post'}>{this.state.button}</button>
            </form>
            <p className="green bold">{this.state.result}</p>
        </div>
        );
    }
}
