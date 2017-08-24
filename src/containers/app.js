import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import actions from '../actions';


@connect(
  state => ({
  
  }), actions
)
export default class App extends React.Component {
  static propTypes = {
  
  };

  componentWillMount() {
    this.props.fetchArticles({source: 'techcrunch'})
  }


  render() {
    return (
      <div>Hello!</div>
      
    );
  }
}
