import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import Loader from '../../components/loader/index';
import List from '../../components/list/index';
import Grid from '../../components/grid/index';

/* eslint-disable "react/require-default-props": 0 */
@inject( 'store' )
@observer
export default class Landing extends Component {
  constructor( props ) {
    super( props );
    this.store = this.props.store.globals;
    this.isAtBottom = el => el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  componentWillMount() {
    if ( this.store.stories.length <= 0 ) {
      this.store.fetchItems( 'stories' );
    }
  }

  componentDidMount() {
    document.addEventListener( 'scroll', this.trackScrolling );
  }

  componentWillUnmount() {
    document.removeEventListener( 'scroll', this.trackScrolling );
  }

  trackScrolling = () => {
    const wrappedElement = document.getElementById( 'root' );

    if ( this.isAtBottom( wrappedElement ) && !this.store.loading ) {
      this.store.loadMore( 'stories' );
    }
  };

  loadList() {
    return (
      this.store.listMode === 'list' ?
        <List items={ this.store.stories } store={ this.store } /> :
        <Grid items={ this.store.stories } store={ this.store } />
    );
  }

  render() {
    return (
      <div>
        <Loader loading={ this.store.loading } />
        { !this.loading ? this.loadList() : <div /> }
      </div>
    );
  }
}

Landing.propTypes = {
  store: PropTypes.shape( {
    globals: PropTypes.shape( {} ),
  } ),
};
