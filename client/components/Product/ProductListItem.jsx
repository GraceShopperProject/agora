import React from 'react';
import { Link } from 'react-router-dom';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Label from 'react-bootstrap/lib/Label';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

const ProductListItem = ({product}) => {
  const {id, name, price, description, img_url, remaining_inventory} = product;
  const isSoldOut = remaining_inventory === 0;
  return (
    <Thumbnail src={img_url} alt={name}>
      <Link to={`/products/${id}`}>
        <h3>{name}</h3>
      </Link>
      <p>{description}</p>
      <ButtonToolbar>
        <Grid fluid>
          <Row>
            <Col xs={12} sm={6}>
              <Link to={`/products/${id}`}>
                <Button bsStyle="default" block>Details</Button>
              </Link>
            </Col>
            <Col xs={12} sm={6}>
              {isSoldOut
                ? <Label bsStyle="warning" block>Sold Out!</Label>
                : <Button bsStyle="primary" block>Add to Cart</Button>
              }
            </Col>
          </Row>
        </Grid>
      </ButtonToolbar>
    </Thumbnail>
  )
}

export default ProductListItem;
