import React, { Children } from 'react';
import { PropTypes as PT } from 'prop-types';
import { submit } from 'redux-form';
import { connect } from 'react-redux';
import $ from 'jquery';
import { Switch, Route } from 'react-router-dom';
import { BackTop } from 'antd';

import actions from '../../actions';
import BookCard from '../../components/BookCard';
import BookDetails from '../../containers/BookDetails'
import SearchForm from '../../components/SearchForm';
import { SEARCH_FORM } from '../../constants/lists';
import './book.scss';

@connect(
  state => ({
    books: state.books.books,
    loading: state.books.loading,
  }),
  { ...actions, submit },
)
export default class BooksList extends React.Component {
  constructor() {
    super();
    this.timer = false;
  }

  static propTypes = {
    books: PT.array,
    loading: PT.bool,
    clearModalType: PT.func,
    createAlert: PT.func,
    dismissAlert: PT.func,
    fetchBooks: PT.func,
    setSearchVal: PT.func,
    clearBookList: PT.func,
    sendSaves: PT.func,
    resetStartIndex: PT.func,
    children: PT.object,
  };
  
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    const { submit, children } = this.props;
    if (children) return;
    if ($(window).scrollTop() === $(document).height() - $(window).height()) {
      submit(SEARCH_FORM);
    }
  };

  onSubmit = ({ searchInput }) => {
    const { fetchBooks } = this.props;
    fetchBooks(searchInput);
  };
  
  renderBookDetails = ({ match: { params: { id }}}) => (
    <BookDetails {...this.props} id={id} />
  );
  
  renderSearchForm = () => {
    const { books, clearBookList, resetStartIndex, submit, loading, sendSaves } = this.props;
    return (
      <div className="news">
        <h1 className="title">Search books:</h1>
        <SearchForm
          resetStartIndex={resetStartIndex}
          clearBookList={clearBookList}
          loading={loading}
          callSubmit={submit}
          onSubmit={this.onSubmit}
        />
        <BackTop />
        <ul className="news__list">
          {books && books.map((book, i) => (
            <BookCard
              key={i}
              id={book.id}
              sendSave={sendSaves}
              path={this.props.match.path}
              {...book.volumeInfo}
            />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className="container">
        <Switch>
          <Route path='/books/:id' render={this.renderBookDetails} />
          <Route exact render={this.renderSearchForm} />
        </Switch>
      </div>
    );
  }
}
