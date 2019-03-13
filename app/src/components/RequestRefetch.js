export default (propName = 'data') =>
  withProps(props => ({ refetch: props[propName] && props[propName].data }));
