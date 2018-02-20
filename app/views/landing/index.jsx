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
 * @class Landing
 *
 */
export default class Landing extends Component {
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
   * @memberof Landing
   *
   */
  componentWillMount() {
    if ( this.store.stories.items.length <= 0 ) {
      this.store.fetchItems( 'stories' );
    }

    this.store.activeItems( '/' );
  }

  /**
   *
   * @description The common React component mounting process. Checks for
   * the finalization of mounting.
   * @memberof Landing
   *
   */
  componentDidMount() {
    document.addEventListener( 'scroll', ::this.trackScrolling );
  }

  /**
   *
   * @description The common React unmounting process.
   * @memberof Landing
   *
   */
  componentWillUnmount() {
    document.removeEventListener( 'scroll', this.trackScrolling );
  }

  /**
   *
   * @description Track the scrolling to fire loading more content.
   * @memberof Landing
   *
   */
  trackScrolling() {
    const wrappedElement = document.getElementById( 'root' );
    const isAtBottom = el => el.getBoundingClientRect().bottom <= window.innerHeight;

    if ( isAtBottom( wrappedElement ) && !this.store.dataLoading ) {
      this.store.loadMore();
    }
  }

  /**
   *
   * @description Load the list via Grid or List View.
   * @memberof Landing
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
   * @memberof Landing
   *
   */
  render() {
    return (
      <div>
        <Header history={ this.props.history } />
        <Filter store={ this.store } />
        { !this.dataLoading ? this.loadList() : <div /> }
      </div>
    );
  }
}

/**
 *
 * @description PropType validation.
 * @memberof Landing
 *
 */
Landing.propTypes = {
  history: PropTypes.shape( {} ),
  store: PropTypes.shape( {
    globals: PropTypes.shape( {} ),
  } ),
};
