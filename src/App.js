import React, { Component } from 'react';
import axios from 'axios';

import Form from './components/Form';
import Items from './components/Items';

import logo from './logo.svg';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            JB
          </h1>
        </header>
        <div className="Form-wrapper">
          <Form />
        </div>
        <div className="Content-wrapper">
          <Items />
        </div>
      </div>
    );
  }
}

export default App;
