import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button, Icon } from 'antd';
import { selectBook, checkExistingSaves } from '../../selectors';
import actions from '../../actions';
import { DEFAULT_IMG } from '../../constants/lists';
import { mapList } from '../../common';
import './book-details.scss';

@connect(
  (state, { id }) => ({
    book: selectBook(id)(state),
    isExistBook: checkExistingSaves(id)(state),
  }), actions,
)

export default class BookDetails extends Component {

  static propTypes = {
    id: PropTypes.string,
    sendSaves: PropTypes.func,
    book: PropTypes.object,
    isExistBook: PropTypes.bool,
  };

  onSaveBook = () => {
    const { sendSaves, id } = this.props;
    sendSaves(id);
  };

  render() {
    const { book, isExistBook, match: { path } } = this.props;
    const {
      volumeInfo: { title, categories, authors, imageLinks, publishedDate, description }
    } = book;
    const desc = description ? description : 'Not found';
    const imgUrl = imageLinks && imageLinks.thumbnail ?
      imageLinks.thumbnail : DEFAULT_IMG;
    const auth = authors && mapList(authors);

    return (
      <div className="book__detail">
        <div className="book__detail-top">
          <div className="book__detail-img">
            <img src={imgUrl} alt="book" />
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
                {categories ? mapList(categories) : 'Unknown'}
              </span>
            </div>
            <div className="book__detail-button">
              <Link to={path}>
                <Button type="primary">
                  <Icon type="left" />Back
                </Button>
              </Link>
              <Button
                type="primary"
                icon='save'
                onClick={this.onSaveBook}
                disabled={isExistBook}
              >
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
    );
  }
}

