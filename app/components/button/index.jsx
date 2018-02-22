import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * @const
 * @description A common button component.
 * @param { Object } props An object list of properties passed down from its caller.
 * @export
 *
 */
const Button = ( props ) => {
  const { onClick, title, classes } = props;
  const passThrough = () => {};

  return (
    <button
      className={ `button ${ classes }` }
      onClick={ onClick }
      onKeyPress={ passThrough }
      tabIndex="0"
    >
      { title }
    </button>
  );
};

/**
 *
 * @description PropType validation.
 * @memberof Button
 *
 */
Button.propTypes = {
  classes: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
};

export default Button;
