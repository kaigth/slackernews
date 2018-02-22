import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import Button from '../button/index';

@observer
/**
 *
 * @description The Header class.
 * @export
 * @class Header
 *
 */
export default class Header extends Component {
  /**
   *
   * @description Navigation handler: Jobs.
   * @memberof Header
   *
   */
  home() {
    this.props.history.push( '/' );
    this.forceUpdate();
  }

  /**
   *
   * @description Navigation handler: Jobs.
   * @memberof Header
   *
   */
  jobs() {
    this.props.history.push( '/jobs' );
    this.forceUpdate();
  }

  /**
   *
   * @description The common React rendering cycle.
   * @memberof Header
   *
   */
  render() {
    return (
      <header className="header">
        <div className="_logo">
          <h1 className="_text">Slacker News</h1>
        </div>
        <div className="_menu">
          <Button
            classes="_link"
            onClick={ () => this.home() }
            title="Home"
          />
          <Button
            classes="_link"
            onClick={ () => this.jobs() }
            title="Jobs"
          />
        </div>
      </header>
    );
  }
}

/**
 *
 * @description PropType validation.
 * @memberof Header
 *
 */
Header.propTypes = {
  history: PropTypes.shape( {
    push: PropTypes.func,
  } ),
};
