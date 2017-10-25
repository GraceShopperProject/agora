import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';

const SoldOutPopover = (
  <Popover id="sold-out-notication" title="Sold Out">
    {`We're all out! So sorry for the inconvenience. We expect to have more
    in stock by the end of time. Please check back then.`}
  </Popover>
);

const ButtonOutOfStock = props => {
  return (
    <OverlayTrigger
      trigger="click"
      placement="top"
      overlay={SoldOutPopover}
      rootClose
    >
      <span>
        <Button
          bsStyle="default"
          bsSize="large"
          block
        >
          Sold Out
        </Button>
      </span>
    </OverlayTrigger>
  );
};

export default ButtonOutOfStock;
