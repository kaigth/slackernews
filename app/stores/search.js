import { observable, action } from 'mobx';

/**
 *
 * @description The search MobX store for searching against array title values.
 * @export
 * @class Search
 *
 */
export default class Search {
  @observable term
  @observable searchArray

  /**
   *
   * @constructor
   *
   */
  constructor() {
    /**
     *
     * @const
     * @description The search term check.
     *
     */
    this.term = '';

    /**
     *
     * @const
     * @description The search array.
     *
     */
    this.searchArray = [];

    this.noResults = {
      id: 0,
      title: 'Bummer, there were no results!',
    };
  }

  /**
   *
   * @description The search function that checks against an array.
   * @memberof Search
   *
   */
  @action clearTerm() {
    this.term = '';
  }

  /**
   *
   * @description The search function that checks against an array.
   * @memberof Search
   * @param { string } arr The array used to check against.
   * @param { string } term The term to search against.
   *
   */
  @action search( arr, term ) {
    const escapeChars = /\/|\\|\.|\||\*|\+|\(|\)|\[|\]|\?|\$|\^/g;
    this.term = term.replace( escapeChars, '' );
    const regex = new RegExp( `${ this.term }`, 'ig' );
    this.searchArray = [];

    arr.map( ( item ) => {
      /* eslint-disable no-lonely-if */
      if ( regex.test( item.title ) ) {
        this.searchArray.push( item );
      }

      return [];
    } );

    return this.term;
  }
}
