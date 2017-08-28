import React from 'react';
import { PropTypes as PT } from 'prop-types';
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
    loading: PT.bool,
    saves: PT.array,
    deleteSave: PT.func,
  };
  
  componentWillMount() {
    this.props.fetchSaves();
  }
  
  renderSavesList = saves => (
    saves && saves.map((save, i) => {
      return (
        <li className="news__item" key={i}>
          <SaveCard
            deleteSave={this.props.deleteSave}
            id={save.id}
            {...save.volumeInfo}
          />
        </li>
      )
    })
  );
  
  render() {
    const { saves, children } = this.props;
    
    return (
      <div className="container">
        {children ? children : (
          <div>
            <h1 className="title">Favorites Books:</h1>
            <ul className="news__list">
              {this.renderSavesList(saves)}
            </ul>
          </div>
        )}
      </div>
    );
  }
  
}



