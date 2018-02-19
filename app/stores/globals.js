import { observable, action } from 'mobx';
import fetch from 'isomorphic-fetch';
import constants from '../constants/global';

export default class Globals {
  @observable stories
  @observable jobs
  @observable loading
  @observable listMode

  constructor() {
    this.stories = [];
    this.storiesById = [];
    this.jobs = [];
    this.loading = true;
    this.listMode = 'list';
    this.constants = constants;

    this.maxRequestLoad = 29;
    this.currentLoad = 0;
    this.sortDirection = 'ASC';
  }

  @action sortArray( obj ) {
    this.sortDirection === 'ASC' ? this.sortDirection = 'DESC' : this.sortDirection = 'ASC';

    this.sortSwitch( obj );
  }

  @action alphabeticalSortASC( obj ) {
    this.stories = this.stories.sort( ( a, b ) => a[ obj ].localeCompare( b[ obj ] ) );
  }

  @action alphabeticalSortDESC( obj ) {
    this.stories = this.stories.sort( ( a, b ) => b[ obj ].localeCompare( a[ obj ] ) );
  }

  @action numericalSortASC( obj ) {
    this.stories = this.stories.sort( ( a, b ) => a[ obj ] - b[ obj ] );
  }

  @action numericalSortDESC( obj ) {
    this.stories = this.stories.sort( ( a, b ) => a[ obj ] + b[ obj ] );
  }

  @action sortSwitch( obj ) {
    if ( typeof ( this.stories[ 0 ][ obj ] ) === 'number' ) {
      this.sortDirection === 'ASC' ?
        this.numericalSortASC( obj ) :
        this.numericalSortDESC( obj );
    } else {
      this.sortDirection === 'ASC' ?
        this.alphabeticalSortASC( obj ) :
        this.alphabeticalSortDESC( obj );
    }
  }

  @action switchList() {
    this.listMode === 'list' ? this.sortDirection = 'grid' : this.sortDirection = 'list';
  }

  @action fetchItems() {
    this.request( this.constants.config.storiesUrl );
  }

  @action newStoryList( data ) {
    if ( data ) this.storiesById = data;

    const slicedArray = this.storiesById.slice( this.currentLoad, this.maxRequestLoad );

    slicedArray.map( item =>
      this.request( `${ this.constants.config.itemUrl + item }.json` ) );
  }

  @action setSingle( data ) {
    this.currentLoad += 1;

    if ( data.type === 'story' ) {
      this.stories = [ ...this.stories, data ];
    } else if ( data.type === 'jobs' ) {
      this.jobs = [ ...this.jobs, data ];
    }

    if ( this.currentLoad >= this.maxRequestLoad ) this.loading = false;
  }

  @action loadMore() {
    this.loading = true;
    this.maxRequestLoad += 29;

    this.newStoryList();
  }

  @action clear() {
    this.storiesById = [];
    this.stories = [];
    this.jobs = [];
  }

  async request( url ) {
    const response = await fetch( url ).catch( err => this.handleError( err ) );
    const data = await response.json();

    data.length > 0 ? this.newStoryList( data ) : this.setSingle( data );
  }

  @action handleError( err ) {
    return this.constants.errors.generic + err;
  }
}
