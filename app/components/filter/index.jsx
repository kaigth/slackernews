import React from 'react';
import PropTypes from 'prop-types';

const Filter = ( props ) => {
  const { store } = props;
  const passThrough = () => {};

  return (
    <div className="list-filter">
      <div className="_name">Sort By: </div>
      <div
        className="_score"
        onClick={ () => store.sortArray( 'score' ) }
        onKeyPress={ passThrough }
        role="button"
        tabIndex="0"
      >
        Scores
      </div>
      <div
        className="_user"
        onClick={ () => store.sortArray( 'by' ) }
        onKeyPress={ passThrough }
        role="button"
        tabIndex="0"
      >
        Users
      </div>
      <div
        className="_date"
        onClick={ () => store.sortArray( 'time' ) }
        onKeyPress={ passThrough }
        role="button"
        tabIndex="0"
      >
        Date
      </div>
    </div>
  );
};

Filter.propTypes = {
  store: PropTypes.shape( {} ),
};

export default Filter;
