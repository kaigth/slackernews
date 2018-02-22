import { observable, action } from 'mobx';
import fetch from 'isomorphic-fetch';
import constants from '../constants/global';
import sortSwitch from '../util/sorter';

/**
 *
 * @description The global MobX Store. Handles all re-rendering for pure state
 * management for the application.
 * @export
 * @class Globals
 *
 */
export default class Globals {
  @observable activeArray
  @observable initialLoad
  @observable dataLoading
  @observable loadLength
  @observable listMode
  @observable animate

  /**
   *
   * @constructor
   *
   */
  constructor() {
    /**
     *
     * @const
     * @description The current load requested.
     *
     */
    this.currentLoad = 0;

    /**
     *
     * @const
     * @description The maximum request load shown per pagination and initial call.
     *
     */
    this.maxRequestLoad = 29;

    /**
     *
     * @const
     * @description Array store of Jobs objects.
     *
     */
    this.jobs = {
      ids: [],
      items: [],
      loads: {
        current: this.currentLoad,
        max: this.maxRequestLoad,
      },
    };

    /**
     *
     * @const
     * @description Array store of Stories objects.
     *
     */
    this.stories = {
      ids: [],
      items: [],
      loads: {
        current: this.currentLoad,
        max: this.maxRequestLoad,
      },
    };

    /**
     *
     * @const
     * @description The initial load to show the splash.
     *
     */
    this.initialLoad = true;

    /**
     *
     * @const
     * @description The loader used to handle pagination loads.
     *
     */
    this.dataLoading = true;

    /**
     *
     * @const
     * @description The cache to display what list mode state is in.
     *
     */
    this.listMode = 'list';

    /**
     *
     * @const
     * @description Cache the constants object.
     *
     */
    this.constants = constants;

    /**
     *
     * @const
     * @description The amount of items to display per pagination call. Increments
     * by this amount each call.
     *
     */
    this.incrementalLoads = 29;

    /**
     *
     * @const
     * @description Cache the direction in which the sort order is actively in.
     *
     */
    this.sortDirection = 'ASC';

    /**
     *
     * @const
     * @description Cache the current active array.
     *
     */
    this.activeArray = [];

    /**
     *
     * @const
     * @description The loader count, resets every new load call.
     *
     */
    this.loaderCount = 0;

    /**
     *
     * @const
     * @description The current loader length. Calculated in width percentage.
     *
     */
    this.loadLength = 0;
  }

  /**
   *
   * @description The start of the array sortment. Checks for ascention and descention and
   * calls the sortSwitch.
   * @memberof Globals
   * @param { string } obj The specific key in the array assortment.
   *
   */
  @action sortArray( obj ) {
    this.sortDirection === 'ASC' ? this.sortDirection = 'DESC' : this.sortDirection = 'ASC';

    this.activeArray.items = sortSwitch( this.activeArray.items, obj, this.sortDirection );
  }

  /**
   *
   * @description The toggle switch handler for List vs Grid.
   * @memberof Globals
   *
   */
  @action switchList() {
    this.listMode === 'list' ? this.listMode = 'grid' : this.listMode = 'list';
  }

  /**
   *
   * @description Sets the active array based off route.
   * @memberof Globals
   * @param { string } nav The current navigation location.
   *
   */
  @action activeItems( nav ) {
    if ( nav === '/' ) {
      this.activeArray = this.stories;
    } else if ( nav === '/jobs' ) {
      this.activeArray = this.jobs;
    }
  }

  /**
   *
   * @description The start of the item fetch. Decipher the type and make the
   * request for the new list.
   * @memberof Globals
   * @param { string } type The type of list you wish to retrieve. Supports only
   * jobs and stories at the moment.
   *
   */
  @action fetchItems( type ) {
    const activeType = type === 'stories' ? 'storiesUrl' : 'jobsUrl';

    this.request( this.constants.config[ activeType ] );
  }

  /**
   *
   * @description Handles the call of new items to be sorted and called against.
   * The service requires a list of ID's then parse them through a seperate single
   * item request. Not super efficient but it works.
   * @memberof Globals
   * @param { string } data An array of items by ID to be sorted through.
   *
   */
  newStoryList( data ) {
    if ( data ) this.activeArray.ids = data;

    const slicedArray =
      this.activeArray.ids.slice( this.activeArray.loads.current, this.activeArray.loads.max );

    slicedArray.map( item =>
      this.request( `${ this.constants.config.itemUrl + item }.json` ) );
  }

  /**
   *
   * @description Sets the single item in a array list via spread. Spread prevents
   * multiple ID's from overlap.
   * @memberof Globals
   * @param { string } data The single object item to be placed in an array via spread.
   *
   */
  setSingle( data ) {
    this.activeArray.loads.current += 1;

    this.activeArray.items = [ ...this.activeArray.items, data ];

    if ( this.maxedIncrementLoads() || this.maxedLoads() ) {
      this.activeArray.loads.max += this.incrementalLoads;
      this.cacheArray( data.type );
      this.resetLoader();
    }
  }

  /**
   *
   * @description Resets the loader counters and loader bools.
   * @memberof Globals
   *
   */
  resetLoader() {
    this.loaderCount = 0;
    this.showLoader();

    if ( this.initialLoad ) this.initialLoad = false;
  }

  /**
   *
   * @description Display the item Loader.
   * @memberof Globals
   *
   */
  showLoader() {
    const timeout = setTimeout( () => {
      this.dataLoading = false;
      clearTimeout( timeout );
    }, 400 );

    const timeout2 = setTimeout( () => {
      this.loadLength = 0;
      clearTimeout( timeout2 );
    }, 600 );
  }

  /**
   *
   * @description Cache the arrays respective to their type.
   * @memberof Globals
   * @param { string } type The type of object.
   *
   */
  cacheArray( type ) {
    if ( type === 'story' ) {
      this.stories = this.activeArray;
    } else if ( type === 'job' ) {
      this.jobs = this.activeArray;
    }
  }

  /**
   *
   * @description Load more items for pagination when bottom of page has been reached.
   * @memberof Globals
   *
   */
  @action loadMore() {
    if ( this.dataLoading || this.maxedLoads() ) return;
    this.dataLoading = true;

    this.newStoryList();
  }

  /**
   *
   * @description Check to see if the maximum set of loads has been reached.
   * @memberof Globals
   *
   */
  maxedLoads() {
    return this.activeArray.loads.current === this.activeArray.ids.length;
  }

  /**
   *
   * @description Check the current max increment load for pagination.
   * @memberof Globals
   *
   */
  maxedIncrementLoads() {
    return this.activeArray.loads.current >= this.activeArray.loads.max;
  }

  /**
   *
   * @description The asynchronous response for each fetch item.
   * @memberof Globals
   * @param { string } url The request url to perform the action on.
   *
   */
  async request( url ) {
    const response = await fetch( url ).catch( err => this.handleError( err ) );
    const data = await response.json();

    if ( !data ) this.handleError( 'unknown' );
    this.handleLoad();

    data.length > 0 ? this.newStoryList( data ) : this.setSingle( data );
  }

  /**
   *
   * @description Handles final load alls such as loader length, animation and loadcount.
   * @memberof Globals
   *
   */
  handleLoad() {
    this.loaderCount += 1;

    this.loadLength = ( this.loaderCount / ( this.incrementalLoads - 1 ) ) * 100;
  }

  /**
   *
   * @description The start of the array sortment. Checks for ascention and descention and
   * calls the sortSwitch.
   * @memberof Globals
   * @param { string } err The error passed from the service if applicable.
   *
   */
  handleError( err ) {
    return { error: this.constants.errors.generic + err };
  }
}
