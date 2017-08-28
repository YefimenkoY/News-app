import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { Button, Icon, message } from 'antd';
import { selectBook } from '../../selectors';
import actions from '../../actions';
import { DEFAULT_IMG } from '../../constants/lists'
import statuses from '../../constants/alertStatuses';
import './book-details.scss';

@connect(
  (state, props) => {
    const id = props.params.id.slice(5);
    return {
      book: selectBook(id)(state),
      id,
      saves: state.saves.saves
    }
  }, actions
)

export default class BookDetails extends Component {
  
  static propTypes = {
    books: PropTypes.array,
    id: PropTypes.string,
    sendSaves: PropTypes.func,
  };
  
  onSaveBook = () => {
    const { sendSaves, id, saves } = this.props;
    const isExistBook = saves.find(save => save.id === id);
    if (isExistBook) return message.warn(statuses.EXIST_BOOK);
    sendSaves(id);
    message.success(statuses.SUCCESS_ADD);
  };
  
  render() {
    const { book } = this.props;
    const {
      volumeInfo: {title, categories, authors, imageLinks, publishedDate, description }
    } = book;
    const desc = description ? description : 'Not found';
    const imgUrl = imageLinks && imageLinks.thumbnail ?
      imageLinks.thumbnail : DEFAULT_IMG;
    const auth = authors && authors.map((author, i) => (
      i <= 3 ? <span key={i}>{author}</span> : '')
    )
    
    return (
      <div className="book__detail">
        <div className="book__detail-top">
          <div className="book__detail-img">
            <img src={imgUrl} alt="book"/>
          </div>
          <div className="book__detail-title">
            <h3>{title}</h3>
            <div className="book__detail-info">
              <div className="info-top">
                 <span className="author">
                   {authors ? auth : 'Unknown'}
                 </span>
                <span className="published">Published: {publishedDate}</span>
              </div>
              <span className="categories">
                {categories ? categories.map((item, i) => (i <= 3) ? <span key={i}>{item}</span> : '') : 'Unknown'}
              </span>
            </div>
            <div className="book__detail-button">
              <Link to="/books">
                <Button type="primary">
                  <Icon type="left" />Back
                </Button>
              </Link>
              <Button type="primary" icon='save' onClick={this.onSaveBook} >
                Save
              </Button>
            </div>
          </div>
        </div>
        <div className="book__detail-bottom">
          <h5>Description:</h5>
          <p>{desc}</p>
        </div>
      </div>
    )
  }
}


