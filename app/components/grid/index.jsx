import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import unixDateFormatter from '../../util/unixDateFormatter';

/**
 *
 * @const
 * @description Grid of items handler.
 * @param { Object } props An object list of properties passed down from its caller.
 * @export
 *
 */
const Grid = ( props ) => {
  const { items } = props;

  return (
    <div className="grid">
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

/**
 *
 * @description PropType validation.
 * @memberof Grid
 *
 */
Grid.propTypes = {
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

export default Grid;
