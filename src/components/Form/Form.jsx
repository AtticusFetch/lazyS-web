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

const typesMap = {
  ['Food Item']: 'foodItems',
  ['Restaurant']: 'restaurants',
};

class ItemForm extends Component {
  state = {
    title: '',
    description: '',
    file: '',
    type: Object.values(typesMap)[0],
    price: null,
    restaurant: null,
    restaurants: []
  };

  componentDidMount() {
    this._fetchRestaurants();
  }

  _fetchRestaurants = () => {
    axios.get('/restaurants')
      .then(res => {
        this.setState({ restaurants: res.data });
      });
  };

  _onTitleChange = e => {
    this.setState({ title: e.target.value });
  };

  _onDescriptionChange = e => {
    this.setState({ description: e.target.value });
  };

  _onFileChange = e => {
    const file = e.target.files[0];
    this.setState({ file });
  };

  _onTypeChange = e => {
    this.setState({ type: typesMap[e.target.value] });
  }

  _onRestaurantChange = e => {
    this.setState({ restaurant: e.target.value });
  }

  _onPriceChange = e => {
    this.setState({ price: e.target.value });
  };

  _handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state);
  };

  render() {
    const { type, restaurants } = this.state;
    console.log(type)
    return (
      <Form>
        <FormGroup row>
          <Label for="select" sm={2}>Item type</Label>
          <Col sm={10}>
            <Input
              onChange={this._onTypeChange}
              type="select"
              name="type"
              id="select"
            >
              {Object.keys(typesMap).map(itemType => <option>{itemType}</option>)}
            </Input>
          </Col>
        </FormGroup>
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
        {type === 'foodItems' && (
          <React.Fragment>
            <FormGroup row>
              <Label for="price" sm={2}>Price</Label>
              <Col sm={10}>
                <Input
                  onChange={this._onPriceChange}
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Price"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="restaurant" sm={2}>Associated restaurant</Label>
              <Col sm={10}>
                <Input
                  onChange={this._onRestaurantChange}
                  type="select"
                  name="restaurant"
                  id="restaurant"
                >
                  {restaurants.map(r => <option>{r.title}</option>)}
                </Input>
              </Col>
            </FormGroup>
          </React.Fragment>
        )}
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
