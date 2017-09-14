import React from 'react';

export const shortenTitle = title => (
  title.length > 15 ? `${title.slice(0, 25)}...` : title
);

export const mapList = list => (
  list && list.map((item, i) => (
    <span key={i}>{item}</span>
  ))
);

export const getDefaultKey = path => {
  switch (path) {
    case '/': return '1';
    case '/books': return '2';
    case '/saves': return '3';
    default: return '1';
  }
};