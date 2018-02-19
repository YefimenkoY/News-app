import React from 'react';

export const shortenTitle = title => (
  !!title && title.length > 15 ? `${title.slice(0, 25)}...` : title
);

export const mapList = list => (
  list && list.map((item, i) => (
    <span key={i}>{item}</span>
  ))
);
