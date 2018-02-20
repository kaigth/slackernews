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
const Splash = ( props ) => {
  const { loading } = props;

  return (
    <div className={ `splash ${ !loading ? '-hidden' : '' } ` }>
      <div className="_loader" />
    </div>
  );
};

/**
 *
 * @const
 * @description PropType validation.
 * @memberof Splash
 *
 */
Splash.propTypes = {
  loading: PropTypes.bool,
};

export default Splash;
