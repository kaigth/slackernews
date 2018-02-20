import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import unixDateFormatter from '../../util/unixDateFormatter';

/**
 *
 * @const
 * @description List of items handler.
 * @param { Object } props An object list of properties passed down from its caller.
 * @export
 *
 */
const List = ( props ) => {
  const { items } = props;

  return (
    <div className="list">
      { items && items.map( item => (
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

/**
 *
 * @const
 * @description PropType validation.
 * @memberof List
 *
 */
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
};

export default List;
