/**
 *
 * @description Ascending alphabetical sort.
 * @param { Array } arr The array used.
 * @param { string } obj The specific key in the array assortment.
 * @return { number } Returns sorted string via localeCompare
 *
 */
const alphabeticalSortASC = ( arr, obj ) =>
  arr.sort( ( a, b ) => a[ obj ].localeCompare( b[ obj ] ) );

/**
 *
 * @description Descending alphabetical sort.
 * @param { Array } arr The array used.
 * @param { string } obj The specific key in the array assortment.
 * @return { number } Returns sorted string via localeCompare
 *
 */
const alphabeticalSortDESC = ( arr, obj ) =>
  arr.sort( ( a, b ) => b[ obj ].localeCompare( a[ obj ] ) );

/**
 *
 * @description Numerical Ascending sort.
 * @param { Array } arr The array used.
 * @param { string } obj The specific key in the array assortment.
 * @return { number } Returns sort order via numerical value.
 *
 */
const numericalSortASC = ( arr, obj ) =>
  arr.sort( ( a, b ) => b[ obj ] - a[ obj ] );

/**
 *
 * @description Numerical Descending sort.
 * @param { Array } arr The array used.
 * @param { string } obj The specific key in the array assortment.
 * @return { number } Returns sort order via numerical value.
 *
 */
const numericalSortDESC = ( arr, obj ) =>
  arr.sort( ( a, b ) => a[ obj ] - b[ obj ] );

/**
 *
 * @description The switch handler to decipher what type of sort should be used.
 * @param { Array } arr The array used.
 * @param { string } obj The specific key in the array assortment.
 * @param { string } direction The direction of ascension/descension.
 * @export
 *
 */
const sortSwitch = ( arr, obj, direction ) => {
  if ( typeof ( arr[ 0 ][ obj ] ) === 'number' ) {
    return direction === 'ASC' ?
      numericalSortASC( arr, obj ) :
      numericalSortDESC( arr, obj );
  } else if ( typeof ( arr[ 0 ][ obj ] ) === 'string' ) {
    return direction === 'ASC' ?
      alphabeticalSortASC( arr, obj ) :
      alphabeticalSortDESC( arr, obj );
  }

  return arr;
};

export default sortSwitch;
