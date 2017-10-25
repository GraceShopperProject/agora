import React from 'react';
import { Link } from 'react-router-dom';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import Image from 'react-bootstrap/lib/Image';
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ButtonAddToCart from './ButtonAddToCart';
import ButtonOutOfStock from './ButtonOutOfStock';
import history from '../../history';

const ProductListItem = ({product}) => {
  const {id, name, price, description, img_url, remaining_inventory, restockDate} = product;
  const shortDescription = `${description.slice(0, 90)}...`;
  const isSoldOut = remaining_inventory === 0;

  return (
    <Thumbnail>
      <Link to={`/products/${id}`}>
        <Image src={img_url} alt={name} responsive />
      </Link>

      <Grid fluid>

        <h3>
          <Link to={`products/${id}`}>
            {name}
          </Link>
        </h3>

        <p><strong>Price:</strong> {`$${price}`}</p>

        <p>{shortDescription}</p>

        <Row>

          <Col xs={6}>
            <Link to={`/products/${id}`}>
              <Button bsSize="large" block>Details</Button>
            </Link>
          </Col>

          <Col xs={6}>

            {isSoldOut && <ButtonOutOfStock restockDate={restockDate} />}
            {!isSoldOut && <ButtonAddToCart product={product} />}
          </Col>

        </Row>
      </Grid>
    </Thumbnail>
  )
}

export default ProductListItem;
