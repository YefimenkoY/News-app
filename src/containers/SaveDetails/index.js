import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button, Icon } from 'antd';
import { selectSaveBook } from '../../selectors';

import actions from '../../actions';
import { DEFAULT_IMG } from '../../constants/lists';
import { mapList } from '../../common';
import '../BookDetails/book-details.scss';

@connect(
  (state, props) => {
    const id = props.params.id.slice(5);
    return { save: selectSaveBook(id)(state), id };
  }, actions
)

export default class SaveDetails extends Component {
  static propTypes = {
    save: PropTypes.object,
    id: PropTypes.string,
  };

  onDelete = () => this.props.deleteSave(this.props.id);

  render() {
    const { save } = this.props;
    const {
      volumeInfo: { title, categories, authors, imageLinks, publishedDate, description }
    } = save;
    const desc = description ? description : 'Not found';
    const imgUrl = imageLinks && imageLinks.thumbnail ?
      imageLinks.thumbnail : DEFAULT_IMG;
    const auth = authors ? mapList(authors) : 'Unknown';

    const categ = categories && mapList(categories);

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
                <span className="author">{!authors ? 'Unknown' : auth }</span>
                <span className="published">Published: {publishedDate}</span>
              </div>
              <span className="categories">
                { !categories ? 'Unknown' : categ }
              </span>
            </div>
            <div className="book__detail-button">
              <Link to="/saves">
                <Button type="primary">
                  <Icon type="left" />
                  Back
                </Button>
              </Link>
              <Link to="/saves" >
                <Button type="primary" icon='delete' onClick={this.onDelete} >
                  Delete
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
    );
  }
}

