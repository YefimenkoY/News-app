import React, { Children } from 'react';
import { PropTypes as PT } from 'prop-types';
import { submit } from 'redux-form';
import { connect } from 'react-redux';
import $ from 'jquery';
import { BackTop } from 'antd';

import actions from '../../actions';
import CardComp from '../../components/Card';
import SearchForm from '../../components/SearchForm';
import { SEARCH_FORM } from '../../constants/lists';
import './book.scss';

@connect(
  state => ({
    books: state.books.books,
    startIndex: state.books.startIndex,
    searchVal: state.books.searchVal,
    loading: state.books.loading,
    modalType: state.books.modalType,
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
    startIndex: PT.number,
    searchVal: PT.string,
    loading: PT.bool,
    modalType: PT.string,
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

  render() {
    const { books, children, clearBookList, resetStartIndex, submit, loading, sendSaves } = this.props;

    return (
      <div className="container">
        {Children.count(children) ? (
          children
        ) : (
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
              {books &&
                books.map((book, i) => (
                  <li className="news__item" key={i}>
                    <CardComp
                      id={book.id}
                      sendSave={sendSaves}
                      {...book.volumeInfo}
                    />
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
