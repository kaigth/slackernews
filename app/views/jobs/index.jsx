import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

@inject( 'store' )
@observer
export default class Jobs extends Component {
  constructor( props ) {
    super( props );
    this.store = this.props.store.globals;
  }

  componentWillMount() {
    if ( this.store.stories.length <= 0 ) {
      this.store.fetchItems( 'jobs' );
    }
  }

  render() {
    return (
      <div>
        { 'well hello again...' }
      </div>
    );
  }
}

Jobs.propTypes = {
  store: PropTypes.shape( {
    globals: PropTypes.shape( {} ),
  } ),
};
