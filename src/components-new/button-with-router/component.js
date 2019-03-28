import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

const ButtonWithRouter = ({ location, to, staticContext, ...restProps }) => (
  <Button to={to} color="primary" component={Link} disabled={location.pathname === to} {...restProps} />
);

ButtonWithRouter.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  staticContext: PropTypes.shape({}),
  to: PropTypes.string.isRequired,
};

ButtonWithRouter.defaultProps = {
  staticContext: undefined,
};

export default ButtonWithRouter;