import Globals from './globals';
import Search from './search';

/**
 *
 * @const
 * @description A stored object of all stores.
 * @export
 *
 */
const appStore = {
  globals: new Globals(),
  search: new Search(),
};

export default appStore;
