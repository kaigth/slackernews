import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

import Splash from './splash/index';
import Loader from './loader/index';
import Landing from '../views/landing/index';
import Jobs from '../views/jobs/index';

@inject( 'store' )
@observer
/**
 *
 * @description A holder for routes and Header. Base of route foundation.
 * @class Routes
 * @export
 *
 */
export default class Routes extends Component {
  render() {
    const { store } = this.props;
    if ( !store.globals.initialLoad ) store.globals.animateIn();

    return (
      <div>
        <Splash loading={ store.globals.initialLoad } />
        <div className={ `root ${ store.globals.pageAnimate ? '-show' : '-hide' }` }>
          <Route exact path="/" component={ Landing } />
          <Route path="/jobs" component={ Jobs } />
          <Loader loading={ store.globals.dataLoading } loadLength={ store.globals.loadLength } />
        </div>
      </div>
    );
  }
}

/**
 *
 * @description PropType validation.
 * @memberof Routes
 *
 */
Routes.propTypes = {
  store: PropTypes.shape( {
    globals: PropTypes.shape( {
      initialLoad: PropTypes.bool,
      dataLoading: PropTypes.bool,
    } ),
  } ),
};
