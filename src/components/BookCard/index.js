import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import { DEFAULT_IMG } from '../../constants/lists';
import { shortenTitle, mapList } from '../../common';
import './Card.scss';

const BookCard = (
  { title, id, imageLinks, sendSave, authors, deleteSave, path }
) => {
  const imgUrl = imageLinks && imageLinks.thumbnail ?
    imageLinks.thumbnail : DEFAULT_IMG;

  const handleClick = () => (deleteSave || sendSave)(id);
  const buttonText = path === '/saves' ? 'Delete' : 'Save';

  return (
    <li className="news__item">
      <Link to={`${path}/${id}`}>
        <div className="news__img">
          <img src={imgUrl} alt="book-img" />
        </div>
      </Link>
      <div className="news__text">
        <Link to={`${path}/${id}`}>
          <h3>
            { shortenTitle(title) }
            <br />
            <span className="news__author">
              {authors ? mapList(authors) : 'Unknown'}
            </span>
          </h3>
        </Link>
        <div className="book__adding">
          <Button onClick={handleClick} ghost type='primary' icon="delete">{buttonText}</Button>
        </div>
      </div>
    </li>
  );
};

BookCard.propTypes = {
  title: PT.string,
  id: PT.string,
  deleteSave: PT.func,
  imageLinks: PT.oneOfType([
    PT.string,
    PT.object
  ]),
  authors: PT.oneOfType([
    PT.string,
    PT.array
  ]),
};

export default BookCard;
