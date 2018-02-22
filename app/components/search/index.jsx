import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * @const
 * @description The Initial Splash loader.
 * @param { Object } props An object list of properties passed down from its caller.
 * @export
 *
 */
const Search = ( props ) => {
  const { term, onChange } = props;

  return (
    <div className="search">
      <input className="_input" placeholder="Search" value={ term } onChange={ evt => onChange( evt ) } />
    </div>
  );
};

/**
 *
 * @const
 * @description PropType validation.
 * @memberof Search
 *
 */
Search.propTypes = {
  term: PropTypes.string,
  onChange: PropTypes.func,
};

export default Search;
