/**
 *
 * @const
 * @description A list of constants used in the server application.
 * @export
 *
 */
const constants = {
  server: {
    port: 3000,
  },
  config: {
    storiesUrl: 'https://hacker-news.firebaseio.com/v0/newstories.json',
    itemUrl: 'https://hacker-news.firebaseio.com/v0/item/',
    jobsUrl: 'https://hacker-news.firebaseio.com/v0/jobstories.json',
  }
};

module.exports = constants;
