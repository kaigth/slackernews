import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Header from '../../components/header/index';
import List from '../../components/list/index';
import Grid from '../../components/grid/index';
import Filter from '../../components/filter/index';

@withRouter
@inject( 'store' )
@observer
/**
 *
 * @description The Landing route and view.
 * @export
 * @class Jobs
 *
 */
export default class Jobs extends Component {
  /**
   *
   * @constructor
   *
   */
  constructor( props ) {
    super( props );

    /**
     *
     * @const
     * @description The global store accessible via MobX.
     *
     */
    this.store = this.props.store.globals;
  }

  /**
   *
   * @description The common React component mounting process. Cycles renderings
   * prior to mounting.
   * @memberof Jobs
   *
   */
  componentWillMount() {
    if ( this.store.jobs.items.length <= 0 ) {
      this.store.fetchItems( 'jobs' );
    }

    this.store.activeItems( '/jobs' );
  }

  /**
   *
   * @description The common React component mounting process. Checks for
   * the finalization of mounting.
   * @memberof Jobs
   *
   */
  componentDidMount() {
    document.addEventListener( 'scroll', ::this.trackScrolling );
  }

  /**
   *
   * @description The common React unmounting process.
   * @memberof Jobs
   *
   */
  componentWillUnmount() {
    document.removeEventListener( 'scroll', this.trackScrolling );
  }

  /**
   *
   * @description Track the scrolling to fire loading more content.
   * @memberof Jobs
   *
   */
  trackScrolling() {
    const wrappedElement = document.getElementById( 'root' );
    const isAtBottom = el => el.getBoundingClientRect().bottom <= window.innerHeight;

    if ( isAtBottom( wrappedElement ) && !this.store.loading ) {
      this.store.loadMore();
    }
  }

  /**
   *
   * @description Load the list via Grid or List View.
   * @memberof Jobs
   *
   */
  loadList() {
    return (
      this.store.listMode === 'list' ?
        <List items={ this.store.activeArray.items } store={ this.store } /> :
        <Grid items={ this.store.activeArray.items } store={ this.store } />
    );
  }

  /**
   *
   * @description The common React rendering cycle.
   * @memberof Jobs
   *
   */
  render() {
    return (
      <div>
        <Header history={ this.props.history } />
        <Filter store={ this.store } />
        { !this.loading ? this.loadList() : <div /> }
      </div>
    );
  }
}

/**
 *
 * @description PropType validation.
 * @memberof Jobs
 *
 */
Jobs.propTypes = {
  history: PropTypes.shape( {} ),
  store: PropTypes.shape( {
    globals: PropTypes.shape( {} ),
  } ),
};
