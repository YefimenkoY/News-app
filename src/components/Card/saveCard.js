import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router';

import { DEFAULT_IMG } from '../../constants/lists';
import { shortenTitle, mapList } from '../../common';

const SaveCard = (
  {  title, id, imageLinks, authors, deleteSave }
) => {
  const imgUrl = imageLinks && imageLinks.thumbnail ?
    imageLinks.thumbnail : DEFAULT_IMG;
  
  const onDelete = () => deleteSave(id);
  
  return (
    <div>
      <Link to={`saves/save-${id}`}>
        <div className="news__img">
          <img src={imgUrl} alt="book-img"/>
        </div>
      </Link>
      <div className="news__text">
        <Link to={`saves/save-${id}`}>
          <h3>
            { shortenTitle(title) }
            <br/>
            <span className="news__author">
              {authors ? mapList(authors) : 'Unknown'}
            </span>
          </h3>
        </Link>
        <div className="book__adding">
          <Button onClick={onDelete} ghost type='primary' icon="delete">delete</Button>
        </div>
      </div>
    </div>
  )
};
export default SaveCard;