import React, { Component } from 'react';
import { Route, NavLink, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Posts from "./Posts";
import Post from "./Post";
import './App.css';

export default class BTCSocialApp extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <h1>BTC Social</h1>
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/posts">Posts</NavLink></li>
            <li><NavLink to="/post">Add post</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/posts" component={Posts}/>
            <Route path="/post" component={Post}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}