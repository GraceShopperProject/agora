import React, { Children } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

const TileGridFeed = (props) => {
  const { children } = props;

  const renderTiles = () => {
    return Children.map(children, child => (
      <Col sm={6} md={4} lg={3}>
        {child}
      </Col>
    ));
  };

  return (
    <Grid>
      <Row>
        {renderTiles()}
      </Row>
    </Grid>
  );
};

export default TileGridFeed;
