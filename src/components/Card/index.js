import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Button } from 'antd';
import { Link } from 'react-router';

import { DEFAULT_IMG } from '../../constants/lists';
import { shortenTitle, mapList } from '../../common';
import './Card.scss';

const CardComp = (
  { title, id, sendSave, imageLinks, authors }
) => {
  const imgUrl = imageLinks && imageLinks.thumbnail ?
    imageLinks.thumbnail : DEFAULT_IMG;
  const shortTitle = shortenTitle(title);

  const onSave = () => sendSave(id);

  return (
    <div>
      <Link to={`books/book-${id}`}>
        <div className="news__img">
          <img src={imgUrl} alt="book-img" />
        </div>
      </Link>
      <div className="news__text">
        <Link to={`books/book-${id}`}>
          <h3>
            { shortTitle }
            <br />
            <span className="news__author">
              {authors ? mapList(authors) : 'Unknown'}
            </span>
          </h3>
        </Link>
        <div className="book__adding">
          <Button
            onClick={onSave}
            ghost
            type='primary'
            icon="cloud-download"
          >
            save
          </Button>
        </div>
      </div>
    </div>
  );
};

CardComp.propTypes = {
  title: PT.string,
  id: PT.string,
  sendSave: PT.func,
  imageLinks: PT.string,
  authors: PT.string,
};

export default CardComp;
