export default function unixDateFormatter( unix ) {
  const date = new Date( unix * 1000 );
  const day = date.getDate();
  const month = `0${ ( date.getMonth() + 1 ) }`;
  const year = date.getFullYear();

  return `${ month }/${ day }/${ year }`;
}
