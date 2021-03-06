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
const Loader = ( props ) => {
  const { loading, loadLength } = props;

  return (
    <div className={ `load-container ${ !loading ? '-hidden' : '' } ` }>
      <div className="_loader" style={ { width: `${ loadLength }%` } } />
    </div>
  );
};

/**
 *
 * @const
 * @description PropType validation.
 * @memberof Loader
 *
 */
Loader.propTypes = {
  loading: PropTypes.bool,
  loadLength: PropTypes.number,
};

export default Loader;
