import React from 'react';
import branch from 'recompose/branch';
import renderComponent from 'recompose/renderComponent';

import Loading from './Loading';

type Props = {
  text?: String,
};
const RequestLoading = ({ text }): Props => {
  return <Loading text={text || 'loading data...'} />;
};

export default (propName = 'data') =>
  branch(props => props[propName] && props[propName].loading, renderComponent(RequestLoading));
