import React, { Component } from "react";
import axios from 'axios';

export default class Users extends Component {
  constructor(props, context) {
    super(props);

    this.state = {
      isLoading: true,
      addingComment: false,
      userList: [],
      error: null,
      name: '',
      email: '',
      body: '',
      postId: '',
      result: [],

    };
  }

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.data)
      .then(userList => {
        this.setState({
          userList: userList,
          isLoading: false
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  //form block
  handleChange = event => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
        [name]: value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    const post = {
      postId: event.target.postId.value,
      name: this.state.name,
      email: this.state.email,
      body: this.state.body,
    };


    console.log("ready to post",post);
    //clear the form elements
    this.setState({
        postId: event.target.postId.value,
        name: '',
        email: '',
        body: '',
        addingComment: true,
      });
    axios.post(`https://jsonplaceholder.typicode.com/comments`, { post })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({
            result: "Success - New comment id:" + res.data.id,
            addingComment: false,
        });
      })
  }


  render() {
    const { isLoading, addingComment, userList, error } = this.state;
    return (
      <React.Fragment>
      <div className="divElement">
        <h2>Posts {userList.length ? "["+userList.length+"]": ''} </h2>
        {error ? <p>{error.message}</p> : null}
        {!isLoading ? userList.map(post => {
          const { id, title, body } = post;
          return (
            <div key={id} className={id % 2 === 0 ? "silverbg":""}>
              <h3>{title}</h3>
              <p>{body}</p>
              <p><b>Add a comment</b></p>
              <form className="divElement" onSubmit={this.handleSubmit}>
                <input type="hidden" name="postId" value={id} />
                <label>
                    Name:
                    <input type="text" name="name" onChange={this.handleChange} />
                </label>
                <label>
                    Email:
                    <input type="text" name="email" onChange={this.handleChange} />
                </label>
                <label>
                    Comment:
                    <textarea name="body" onChange={this.handleChange} />
                </label>
                <button type="submit">{Number(this.state.postId) === Number(id) && addingComment ? "Adding Comment...": "Add comment"}</button>
              </form>
              <p className="green bold">{Number(this.state.postId) === Number(id) ? this.state.result: ""}</p>
              <hr />
            </div>
          );}) : <h4>Loading...</h4>}
      </div>
      </React.Fragment>
    );
  }
}