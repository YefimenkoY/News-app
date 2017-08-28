import React, { Children } from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import $ from 'jquery';
import actions from '../../actions';

import CardComp from '../../components/Card';
import { Input, BackTop, message } from 'antd';
import { ErrorAlert, SuccessAlert } from '../../components/Modals';
import alertStatuses from '../../constants/alertStatuses'
import { MAX_RESULTS } from '../../constants/lists';
import './book.scss';

@connect(
  state => ({
    books: state.books.books,
    startIndex: state.books.startIndex,
    searchVal: state.books.searchVal,
    loading: state.books.loading,
    modalType: state.books.modalType,
    saves: state.saves.saves,
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
  };
  
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    this.searchInput.focus();
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }
  
  componentDidUpdate(prevProps) {
    const { modalType, clearModalType, createAlert, dismissAlert, searchVal } = this.props;
    const { NOT_FOUND } = alertStatuses;
    modalType && createAlert(modalType, NOT_FOUND);
    if (prevProps.searchVal !== searchVal && modalType === 'not-found') {
      dismissAlert(modalType);
      clearModalType()
    }
  }
  
  onScroll = () => {
    const {fetchBooks, children, startIndex, modalType, searchVal} = this.props;
    if (children) return;
    const params = { q: searchVal, startIndex, maxResults: 9};
    if($(window).scrollTop() === $(document).height() - $(window).height()){
      searchVal && modalType !== 'not-found' && fetchBooks(params);
    }
  };
  
  onChange = e => {
    const {
      fetchBooks,
      clearBookList,
      startIndex,
      setSearchVal,
      searchVal,
      loading,
    } = this.props;
    const params = { q: searchVal, startIndex, maxResults: MAX_RESULTS };
    
    if (loading) return;
    setSearchVal(e.target.value);
    clearBookList();
    
    if (this.timer) clearTimeout(this.timer);
  
    this.timer = setTimeout(() => {
      searchVal && fetchBooks(params);
      this.timer = false;
    }, 800);
  };
  
  render() {
    const { books, children, saves, searchVal, sendSaves } = this.props;
    
    return (
      <div className="container">
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
              value={searchVal}
            />
            <BackTop/>
            <ul className="news__list">
              {books && books.map(
                (book, i) => (
                  <li className="news__item" key={i} >
                    <CardComp
                      id={book.id}
                      sendSave={sendSaves}
                      {...book.volumeInfo}
                      saves={saves}
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



