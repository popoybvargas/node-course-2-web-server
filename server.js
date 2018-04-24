const express = require( 'express' );
const hbs = require( 'hbs' );
const fs = require( 'fs' );

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials( __dirname + '/views/partials' );
app.set( 'view engine', 'hbs' );

// LOGGER
app.use( ( req, res, next ) =>
{
	var now = new Date().toString();
	var log = `${ now }: ${ req.method } ${ req.url }`;

	console.log( log );
	fs.appendFile( 'server.log', log + '\n', ( err ) =>
	{
		if ( err ) console.log( 'Unable to append to server.log' );
	});

	next();
});
/**
// MAINTENANCE MIDDLEWARE
app.use( ( req, res, next ) =>
{
	res.render( 'maintenance.hbs' );
});
*/
app.use( express.static(  __dirname + '/public' ) );

hbs.registerHelper( 'getCurrentYear', () =>
{
	return new Date().getFullYear();
});

hbs.registerHelper( 'screamIt', ( string ) =>
{
	return string.toUpperCase();
});

app.get( '/', ( req, res ) =>
{
	// res.send(
	// {
	// 	name: 'Popoy',
	// 	likes:
	// 	[
	// 		'Jiu-Jitsu',
	// 		'MMA',
	// 		'Badminton'
	// 	]
	// });
	res.render( 'home.hbs',
	{
		pageTitle: 'Home Page',
		welcomeMessage: 'Hello there, Popoy'
	});
});

app.get( '/about', ( req, res ) =>
{
	// res.send( 'About Page' );
	res.render( 'about.hbs',
	{
		pageTitle: 'About Page'
	});
});

app.get( '/bad', ( req, res ) =>
{
	res.send(
	{
		errorMessage: 'Oops! Something went wrong with your request.'
	});
});

app.listen( port, () =>
{
	console.log( `Server is up on port ${ port }` );
});