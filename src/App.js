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
    isLoading: false,
  };

  componentDidMount() {
    this._fetchItems();
  }

  _fetchItems = () => {
    this.setState({ isLoading: true });
    Promise.all([axios.get('/foodItems'), axios.get('/restaurants')])
      .then(responses => {
        this.setState(state => ({
          itemChunks: _.chunk(responses[0].data.concat(responses[1].data), 3),
          isLoading: false,
        }));
      })
      .catch((e) => {
        console.error(e)
        this.setState({ isLoading: false });
      });
  };
  
  _fetchRestaurants = () => {
    this.setState({ isLoading: true });
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
