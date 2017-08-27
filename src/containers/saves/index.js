import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import actions from '../../actions';

import '../../styles/main.scss';
import SaveCard from '../../components/Card/saveCard';

@connect(
  state => ({
    loading: state.saves.loading,
    saves: state.saves.saves,
  }), actions
)
export default class Saves extends React.Component {

  static propTypes = {
  
  };
  
  componentWillMount() {
    this.props.fetchSaves();
  }
  
  render() {
    const { saves } = this.props;
    
    return (
      <div className="container">
        <h1 className="title">Favorites Books:</h1>
        <ul className="saves">
          {saves && saves.map((save, i) => {
            return (
              <li key={i}>
                <SaveCard {...save.volumeInfo}/>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
  
}



