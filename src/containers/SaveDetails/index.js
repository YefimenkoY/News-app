import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button, Icon } from 'antd';

import '../BookDetails/book-details.scss';

import actions from '../../actions';
import { DEFAULT_IMG } from '../../constants/lists';


@connect(
  state => ({
    saves: state.saves.saves,
  }), actions
)

export default class SaveDetails extends Component {
  
  static propTypes = {
    books: PropTypes.array.isRequired,
    saveBook: PropTypes.func.isRequired,
  };
  
  onSaveBook = () => {
    const val = this.props.params.id.slice(5);
    this.props.saveBook(val)
  };
  
  render() {
    const { saves, params } = this.props;
    const save = saves.filter(save => save.id === params.id.slice(5))[0];
    const {
      volumeInfo: {title, categories, authors, imageLinks, publishedDate, description }
    } = save;
    const desc = description ? description : 'Not found';
    const imgUrl = imageLinks && imageLinks.thumbnail ?
      imageLinks.thumbnail : DEFAULT_IMG;
    
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
                   {authors ? authors.map((author, i) => i <= 3 ? <span key={i}>{author}</span> : '') : 'Unknown'}
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


