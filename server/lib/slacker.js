const fetch = require( 'isomorphic-fetch' );
var fs = require( 'fs' );

const constants = require( '../constants/global' );

class Slacker {
  constructor( req, res ) {
    this.activeArray = {
      ids: [],
      items: [],
      loads: {
        current: 0,
      },
    };

    this.req = req;

    this.res = res;

    this.init();
  }

  /**
   *
   * @description Initialize the service.
   * @memberof Slacker
   *
   */
  init() {
    this.fetchList();
  }

  /**
   *
   * @description Handles the call of new items to be sorted and called against.
   * The service requires a list of ID's then parse them through a seperate single
   * item request. Not super efficient but it works.
   * @memberof Slacker
   *
   */
  fetchList() {
    this.request( constants.config.storiesUrl );
  }

  /**
   *
   * @description Handles the call of new items to be sorted and called against.
   * The service requires a list of ID's then parse them through a seperate single
   * item request. Not super efficient but it works.
   * @memberof Slacker
   * @param { array } data An array of items by ID to be sorted through.
   *
   */
  newStoryList( data ) {
    if ( data ) this.activeArray.ids = data;

    this.activeArray.ids.map( item =>
      this.request( `${ constants.config.itemUrl + item }.json` ) );
  }

  /**
   *
   * @description Sets the single item in a array list via spread. Spread prevents
   * multiple ID's from overlap.
   * @memberof Slacker
   * @param { object } data The single object item to be placed in an array via spread.
   *
   */
  setSingle( data ) {
    this.activeArray.loads.current += 1;
    this.activeArray.items.push( data );

    if ( this.maxedLoads() ) {
      // const json = JSON.stringify( obj );
      // fs.writeFile('./data/data.json', json, 'utf8', this.doeet( this.activeArray ) );
      this.doeet( this.activeArray );
    }
  }

  /**
   *
   * @description Returns the resolved data back to the user.
   * @memberof Slacker
   * @param { object } data The single object item to be placed in an array via spread.
   *
   */
  doeet( data ) {
    this.res.status( 200 ).send( { items: data } );
  }

  /**
   *
   * @description Check to see if the maximum set of loads has been reached.
   * @memberof Slacker
   * @return { bool } Returns true or false if the load is equal to the length of ids.
   *
   */
  maxedLoads() {
    return this.activeArray.loads.current === this.activeArray.ids.length;
  }

  /**
   *
   * @description The asynchronous response for each fetch item.
   * @memberof Slacker
   * @param { string } url The request url to perform the action on.
   *
   */
  request( url ) {
    fetch( url )
      .then( data => data.json() )
      .then( data => data.length > 0 ? this.newStoryList( data ) : this.setSingle( data ) )
      .catch( err => err );
  }
}

module.exports = Slacker;