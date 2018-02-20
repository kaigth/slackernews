import React from 'react';
import PropTypes from 'prop-types';

import Button from '../button/index';

/**
 *
 * @const
 * @description The filter that modifies the list and grid.
 * @param { Object } props An object list of properties passed down from its caller.
 * @export
 *
 */
const Filter = ( props ) => {
  const { store } = props;

  return (
    <div className="list-filter">
      <div className="_list-select">
        <div className="_name">Show as: </div>
        <Button
          className="_score"
          onClick={ () => store.switchList() }
          title={ store.listMode === 'list' ? 'Grid' : 'List' }
        />
      </div>
      <div className="_name">Sort By: </div>
      <Button
        className="_score"
        onClick={ () => store.sortArray( 'score' ) }
        title="Scores"
      />
      <Button
        className="_user"
        onClick={ () => store.sortArray( 'by' ) }
        title="Users"
      />
      <Button
        className="_date"
        onClick={ () => store.sortArray( 'time' ) }
        title="Date"
      />
    </div>
  );
};

/**
 *
 * @description PropType validation.
 * @memberof Filter
 *
 */
Filter.propTypes = {
  store: PropTypes.shape( {} ),
};

export default Filter;
