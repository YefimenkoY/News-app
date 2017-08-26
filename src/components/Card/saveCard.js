import React from 'react';
import { Card, Button } from 'antd';

import { DEFAULT_IMG } from '../../constants/lists';

const SaveCard = (
  {  title, imageLinks }
) => {
  const imgUrl = imageLinks && imageLinks.thumbnail ?
    imageLinks.thumbnail : DEFAULT_IMG;
  
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
        <h3>{title}</h3>
        <p>{''}</p>
        <Button primary>delete</Button>
      </div>
    </Card>
  )
};
export default SaveCard;