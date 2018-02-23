const express = require( 'express' );
const app = express();
const constants = require( './constants/global' );
const Slacker = require( './lib/slacker' );

app.get( '/', ( req, res ) => {
  const slackit = new Slacker( req, res );
} );

app.listen( constants.server.port, () => console.log( 'Running on port 3000' ) );