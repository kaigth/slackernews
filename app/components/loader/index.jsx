import React from 'react';
import PropTypes from 'prop-types';

const Loader = ( props ) => {
  const { loading } = props;

  return (
    <div className={ `splash ${ !loading ? '-hidden' : '' } ` }>
      <div className="_loader" />
    </div>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool,
};

export default Loader;
