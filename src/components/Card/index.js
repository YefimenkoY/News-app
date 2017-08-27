import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router';

import { DEFAULT_IMG } from '../../constants/lists';
import { shortenTitle } from '../../common';
import './Card.scss';
const CardComp = (
  {  title, id, sendSave, imageLinks, authors }
  ) => {
  const imgUrl = imageLinks && imageLinks.thumbnail ?
    imageLinks.thumbnail : DEFAULT_IMG;
  
  const onSave = () => sendSave(id);
  
  return (
    <div>
      <Link to={`books/book-${id}`}>
        <div className="news__img">
          <img src={imgUrl} alt="book-img"/>
        </div>
      </Link>
      <div className="news__text">
        <Link to={`books/book-${id}`}>
          <h3>
            { shortenTitle(title) }
            <br/>
            <span className="news__author">
              {authors ? authors.map((author, i) => (i <= 3) ?
              <span key={i}>{author}</span> : '') : 'Unknown'}
            </span>
          </h3>
        </Link>
        <div className="book__adding">
          <Button onClick={onSave} ghost type='primary' icon="cloud-download">save</Button>
        </div>
      </div>
    </div>
  )
};
export default CardComp;