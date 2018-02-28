import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import actions from '../../actions';
import { Switch, Route } from 'react-router-dom';

import '../../styles/main.scss';
import BookCard from '../../components/BookCard';
import BookDetails from '../../containers/BookDetails'

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
    fetchSaves: PT.func,
    children: PT.object,
  };

  componentWillMount() {
    this.props.fetchSaves();
  }

  renderSavesList = saves => (
    <div>
      <h1 className="title">Favorites Books:</h1>
      <ul className="news__list">
        {saves && saves.map((save, i) => {
          return (
            <li className="news__item" key={i}>
              <BookCard
                deleteSave={this.props.deleteSave}
                id={save.id}
                path={this.props.match.path}
                {...save.volumeInfo}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
  
  renderSavesDetails = ({ match: { params: { id }}}) => <BookDetails {...this.props} id={id} />

  render() {
    const { saves } = this.props;

    return (
      <div className="container">
        <Switch>
          <Route path='/saves/:id' render={this.renderSavesDetails} />
          <Route exact render={() => this.renderSavesList(saves)} />
        </Switch>
      </div>
    );
  }
}
