import React from 'react';
import { Card, Button } from 'antd';
import { Link } from 'react-router';

import { DEFAULT_IMG } from '../../constants/lists';


const CardComp = (
  {  title, id, sendSave, imageLinks }
  ) => {
  const imgUrl = imageLinks && imageLinks.thumbnail ?
    imageLinks.thumbnail : DEFAULT_IMG;
  
  const onSave = () => sendSave(id);
  
  return (
    <Card style={{width:300,height:400}} bodyStyle={{padding:20}}>
      <div className="custom-image">
        <img
          alt="example"
          width="100%"
          height='200px'
          src={imgUrl}
        />
      </div>
      <div className="custom-card">
        <Link to={`books/book-${id}`}>
          <h3>{title}</h3>
        </Link>
        <p>{''}</p>
        <Button onClick={onSave} primary>save</Button>
      </div>
    </Card>
  )
};
export default CardComp;