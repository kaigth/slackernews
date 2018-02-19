import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import unixDateFormatter from '../../util/unixDateFormatter';
import Filter from '../filter/index';

const List = ( props ) => {
  const { items, store } = props;

  return (
    <div className="list">
      <Filter store={ store } />
      { items.map( item => (
        <div className="_item" key={ item.id }>
          <p className="_title">{ item.title }</p>
          <div className="_detail">
            <div className="_score">{ `${ item.score } point${ item.score > 1 ? 's' : '' }` }</div>
            <div className="_user">By: { item.by }</div>
            <div className="_time">When: { unixDateFormatter( item.time ) }</div>
          </div>
          <Link className="_link" key={ item.id } to={ item.url || '' } target="_blank" />
        </div>
        ) )
      }
    </div>
  );
};

List.propTypes = {
  items: PropTypes.shape( {
    by: PropTypes.string,
    descendants: PropTypes.number,
    id: PropTypes.number,
    score: PropTypes.number,
    time: PropTypes.number,
    title: PropTypes.string,
    type: PropTypes.string,
    url: PropTypes.string,
  } ),
  store: PropTypes.shape( {} ),
};

export default List;
