import React, { Component } from 'react';
import axios from 'axios';
import { 
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
  Row,
  Col
} from 'reactstrap';

import './Form.css';

class ItemForm extends Component {
  state = {
    title: '',
    description: '',
    file: '',
  };

  _onTitleChange = e => {
    this.setState({ title: e.target.value });
  };

  _onDescriptionChange = e => {
    this.setState({ descrition: e.target.value });
  };

  _onFileChange = e => {
    const file = e.target.files[0];
    this.setState({ file });
  };

  _handleSubmit = e => {
    e.preventDefault();

    const { title, description, file } = this.state;
    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('picture', file);

    axios.post('/upload', data)
      .then(() => document.location.reload(true));
  };

  render() {
    return (
      <Form>
        <FormGroup row>
          <Label for="title" sm={2}>Title</Label>
          <Col sm={10}>
            <Input
              onChange={this._onTitleChange}
              type="text"
              name="title"
              id="title"
              placeholder="item title"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="description" sm={2}>Description</Label>
          <Col sm={10}>
            <Input
              onChange={this._onDescriptionChange}
              type="textarea"
              name="description"
              id="description"
              placeholder="Enter description here"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="file" sm={2}>File</Label>
          <Col sm={10}>
            <Input
              onChange={this._onFileChange}
              type="file"
              name="file"
              id="file"
            />
            <FormText color="muted">
              Choose a picture assosiated with this item
            </FormText>
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button onClick={this._handleSubmit}>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default ItemForm;
