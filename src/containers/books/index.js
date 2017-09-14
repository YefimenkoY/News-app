import React, { Children } from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { createHistory } from 'history';
import $ from 'jquery';
import { Input, BackTop } from 'antd';

import actions from '../../actions';
import CardComp from '../../components/Card';
import { ErrorAlert, SuccessAlert } from '../../components/Modals';
import alertStatuses from '../../constants/alertStatuses';
import { MAX_RESULTS } from '../../constants/lists';
import './book.scss';

const history = createHistory();

@connect(
  state => ({
    books: state.books.books,
    startIndex: state.books.startIndex,
    loading: state.books.loading,
    modalType: state.books.modalType,
  }), actions
)
export default class BooksList extends React.Component {
  constructor() {
    super();
    this.timer = false;
  }

  static propTypes = {
    books: PT.array,
    startIndex: PT.number,
    loading: PT.bool,
    modalType: PT.string,
    clearModalType: PT.func,
    createAlert: PT.func,
    dismissAlert: PT.func,
    fetchBooks: PT.func,
    clearBookList: PT.func,
    sendSaves: PT.func,
    resetStartIndex: PT.func,
    children: PT.object,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    if (!location.search) this.props.clearBookList();
    this.searchInput.focus();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  componentDidUpdate(prevProps) {
    const { modalType, clearModalType, createAlert, dismissAlert } = this.props;
    const q = location.search.slice(7);
    modalType && createAlert(modalType, alertStatuses.NOT_FOUND);
    if (q && modalType === 'not-found') {
      dismissAlert(modalType);
      clearModalType();
    }
  }

  onScroll = () => {
    const { fetchBooks, children, startIndex, modalType } = this.props;
    const q = location.search.slice(7);
    if (children) return;
    const params = { q, startIndex, maxResults: 9 };
    if ($(window).scrollTop() === $(document).height() - $(window).height()) {
      q && fetchBooks(params);
    }
  };
  
  componentWillMount() {
    const { fetchBooks, startIndex } = this.props;
    const q = location.search.slice(7);
    const params = { q, startIndex, maxResults: MAX_RESULTS };
    q && fetchBooks(params);
  }

  onChange = e => {
    const {
      fetchBooks,
      clearBookList,
      startIndex,
      loading,
      resetStartIndex,
    } = this.props;
    
    history.push({ ...location, search: `?query=${e.target.value}` });
    const q = location.search.slice(7);

    if (loading) return;
    clearBookList();
    resetStartIndex();
    const params = { q, startIndex, maxResults: MAX_RESULTS };
    
    if (this.timer) clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      q && fetchBooks(params);
      this.timer = false;
    }, 800);
  };

  render() {
    const { books, children, sendSaves } = this.props;
    const val = decodeURIComponent(global.location.search.slice(7));
    
    return (
      <div>
        {Children.count(children) ? children : (
          <div className="news">
            <div className="modals">
              <ErrorAlert />
              <SuccessAlert />
            </div>
            <h1 className="title">Search books:</h1>
            <Input
              className='search-input'
              placeholder="Search..."
              ref={this.inputRef}
              onChange={this.onChange}
              value={val}
            />
            <BackTop />
            <ul className="news__list">
              {books && books.map(
                (book, i) => (
                  <li className="news__item" key={i} >
                    <CardComp
                      id={book.id}
                      sendSave={sendSaves}
                      {...book.volumeInfo}
                    />
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }

  inputRef = el => this.searchInput = el;
}

