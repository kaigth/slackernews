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
  const { sort, listMode, switchList } = props;

  return (
    <div className="list-filter">
      <div className="_name">Sort By: </div>
      <Button
        classes="_score _link"
        onClick={ () => sort( 'score' ) }
        title="Scores"
      />
      <Button
        classes="_user _link"
        onClick={ () => sort( 'by' ) }
        title="Users"
      />
      <Button
        classes="_date _link"
        onClick={ () => sort( 'time' ) }
        title="Date"
      />
      <div className="_list-select">
        <div className="_name">Show as: </div>
        <Button
          onClick={ () => switchList() }
          title={ listMode === 'list' ? 'Grid' : 'List' }
        />
      </div>
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
  listMode: PropTypes.string,
  sort: PropTypes.func,
  switchList: PropTypes.func,
};

export default Filter;
