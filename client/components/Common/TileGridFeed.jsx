import React, { Children } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

const TileGridFeed = (props) => {
  const { children } = props;

  const arrayify = chitlens => Children.toArray(chitlens);

  const putInColumns = childrenArr => childrenArr.map(child => (
    <Col sm={6} md={4} lg={3}>
      {child}
    </Col>
  ));

  const renderTiles = () => {
    return putInColumns(arrayify(children));
  };

  // const renderRows = () => {
  //   Children.
  // }

  return (
    <Grid>
      <Row>
        {renderTiles()}
      </Row>
    </Grid>
  );
};

export default TileGridFeed;
