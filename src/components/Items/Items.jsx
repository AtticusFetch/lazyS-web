import React, { Component } from 'react';
import axios from 'axios';
import { 
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardDeck,
  Button,
  Row,
  Col
} from 'reactstrap';
import shortid from 'shortid';
import _ from 'lodash';

class ItemsList extends Component {
  state = {
    itemChunks: []
  };

  componentDidMount() {
    axios.get('/items')
      .then(response => {
        this.setState({ itemChunks: _.chunk(response.data, 3) });
      });
  }

  _renderItem = item => (
    <Col sm="4" key={shortid.generate()}>
      <Card>
        <CardImg top width="100%" src={item.image} alt={item.title} />
        <CardBody>
          <CardTitle>{item.title}</CardTitle>
          <CardText>{item.description}</CardText>
        </CardBody>
      </Card>
    </Col>
  );

  _renderChunk = chunk => (
    <Row key={shortid.generate()}>
      {chunk.map(this._renderItem)}
    </Row>
  );

  render() {
    return (
      <CardDeck>
        {this.state.itemChunks.map(this._renderChunk)}
      </CardDeck>
    );
  }
}

export default ItemsList;
