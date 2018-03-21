import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

import Form from './components/Form';
import Items from './components/Items';

import logo from './logo.svg';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  state = {
    itemChunks: [],
    isLoading: true,
  };

  componentDidMount() {
    this._fetchItems();
  }

  _fetchItems = () => {
    axios.get('/foodItems')
      .then(response => {
        this.setState({
          itemChunks: _.chunk(response.data, 3),
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  };

  _onSubmit = formData => {
    const {
      title,
      description,
      file,
      type,
      price,
      restaurant,
    } = formData;
    this.setState({ isSubmitting: true });
    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('picture', file);
    data.append('type', type);
    if (price) {
      data.append('price', price);
    }
    if (restaurant) {
      data.append('restaurant', restaurant);
    }

    axios.post('/upload', data)
      .then(() => {
        this.setState({ isSubmitting: false });
        this._fetchItems();
      })
      .catch(() => {
        this.setState({ isSubmitting: false });
      });
  };

  render() {
    const { isLoading, isSubmitting, itemChunks } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            JB
          </h1>
        </header>
        <div className="Form-wrapper">
          {isSubmitting && <div className="overlay" />}
          <Form
            onSubmit={this._onSubmit}
          />
        </div>
        <div className="Content-wrapper">
          {isLoading && <div className="overlay" />}
          <Items
            itemChunks={itemChunks}
          />
        </div>
      </div>
    );
  }
}

export default App;
