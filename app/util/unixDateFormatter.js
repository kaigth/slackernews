/**
 *
 * @description Format dates based off unix date format.
 * @param { number } unix The unix timestamp.
 * @return { string } Returns a formatted unix string.
 *
 */
export default function unixDateFormatter( unix ) {
  const date = new Date( unix * 1000 );
  const day = date.getDate();
  const month = `0${ ( date.getMonth() + 1 ) }`;
  const year = date.getFullYear();

  return `${ month }/${ day }/${ year }`;
}
