import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    title: '',
    descrition: '',
    file: '',
  };

  _onTitleChange = e => {
    this.setState({ title: e.target.value });
  };
  _onDescriptionChange = e => {
    this.setState({ descrition: e.target.value });
  };
  _onFileChange = e => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result
      });
      console.log(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  _onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            Fill data
          </h1>
        </header>
        <form
          method="post"
          enctype="multipart/form-data"
          action="/upload"
          className="form"
          onSubmit={this._onSubmit}
        >
          <label className="inputWrapper">
            Item title
            <input 
              onChange={this._onTitleChange}
              className="input"
              type="text"
              placeholder="title"
            />
          </label>
          <label>
            Description
            <textarea
              onChange={this._onDescriptionChange}
            />
          </label>
          <label>
            Image
            <input
              onChange={this._onFileChange}
              type="file"
            />
          </label>
          <input
            type="submit"
          />
        </form>
      </div>
    );
  }
}

export default App;
