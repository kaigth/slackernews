import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Header from '../../components/header/index';
import List from '../../components/list/index';
import Grid from '../../components/grid/index';
import Filter from '../../components/filter/index';
import Search from '../../components/search/index';

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
    this.globals = this.props.store.globals;

    /**
     *
     * @const
     * @description The search store accessible via MobX.
     *
     */
    this.searchStore = this.props.store.search;

    /**
     *
     * @const
     * @description The search store accessible via MobX.
     *
     */
    this.handleChange = ::this.handleChange;
  }

  /**
   *
   * @description The common React component mounting process. Cycles renderings
   * prior to mounting.
   * @memberof Landing
   *
   */
  componentWillMount() {
    if ( this.globals.stories.items.length <= 0 ) {
      this.globals.fetchItems( 'stories' );
    }

    this.searchStore.clearTerm();
    this.globals.activeItems( '/' );
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

    if ( isAtBottom( wrappedElement ) ) {
      this.globals.loadMore();
    }
  }

  /**
   *
   * @description Load the list via Grid or List View.
   * @memberof Landing
   *
   */
  loadList() {
    const items = this.searchStore.term !== ''
      ? this.searchStore.searchArray
      : this.globals.activeArray.items;

    return (
      this.globals.listMode === 'list' ?
        <List items={ items } /> :
        <Grid items={ items } />
    );
  }

  /**
   *
   * @description Handle search input changes.
   * @memberof Landing
   *
   */
  handleChange( evt ) {
    this.searchStore.search( this.globals.activeArray.items, evt.target.value );
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
        <Header
          history={ this.props.history }
          animateOut={ cb => this.globals.animateOut( cb ) }
        />
        <Filter
          listMode={ this.globals.listMode }
          sort={ str => this.globals.sortArray( str ) }
          switchList={ () => this.globals.switchList() }
        />
        <Search value={ this.searchStore.term } onChange={ evt => this.handleChange( evt ) } />
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
    search: PropTypes.shape( {} ),
  } ),
};
