import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import $ from 'jquery';
import actions from '../../actions';

import '../../styles/main.scss';
import CardComp from '../../components/Card';
import { Input } from 'antd';
import Modals from '../../common/Modals';

import { MAX_RESULTS } from '../../constants/lists';

@connect(
  state => ({
    books: state.books.books,
    startIndex: state.books.startIndex,
    searchVal: state.books.searchVal,
    loading: state.books.loading,
    modal: state.alerts.modal,
    text: state.alerts.text,
  }), actions
)
export default class BooksList extends React.Component {
  constructor() {
    super();
    this.timer = false;
  }
  static propTypes = {
  
  };
  
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    this.searchInput.focus();
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }
  
  onScroll = () => {
    const { fetchBooks, index, searchVal } = this.props;
    const params = { q: searchVal, startIndex: index, maxResults: 9 };
    if ($(window).scrollTop() === $(document).height() - $(window).height()){
      searchVal && fetchBooks(params);
    }
  };
  
  onChange = e => {
    const {
      fetchBooks,
      clearBookList,
      startIndex,
      setSearchVal,
      searchVal,
    } = this.props;
    const q = e.target.value === '' ? '' : searchVal;
    const params = { q, startIndex, maxResults: MAX_RESULTS };
    
    setSearchVal(e.target.value);
    clearBookList();
    
    if (this.timer) clearTimeout(this.timer);
  
    this.timer = setTimeout(() => {
      q && fetchBooks(params);
      this.timer = false;
    }, 800);
  };
  
  render() {
    const { books, searchVal, sendSaves } = this.props;
    
    return (
      <div className="container">
        <h1>Search books:</h1>
        <Input
          placeholder="Search..."
          ref={this.inputRef}
          onChange={this.onChange}
          value={searchVal}
        />
        <ul className="cards">
          {books && books.map(
            (book, i) => (
              <li key={i} >
                <CardComp id={book.id} sendSave={sendSaves} {...book.volumeInfo} />
              </li>
            )
          )}
        </ul>
      </div>
    );
  }
  
  inputRef = el => this.searchInput = el;
}



