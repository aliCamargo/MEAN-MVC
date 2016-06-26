/**
 * Created by alicamargo on 23/06/16.
 * mongodb://username:password@localhost:27027/database
 *
 * mongodb -> MongoDB protocol
 * username:password -> Login credential for database
 * localhost -> Server address
 * 27027 -> Port
 * database -> Database Name
 */
var mongoose = require( 'mongoose' );

/*
* Define database connection string and use it to open Mongoose connection
**/
var dbURI = 'mongodb://localhost/Loc8r';
mongoose.connect(dbURI);

    /*
     * For multiple connections
     **/
    // var dbURIlog = 'mongodb://localhost/Loc8rLog';
    // var logDB = mongoose.createConnection(dbURIlog);

    //--  Monitoring connection event for named connection
    // logDB.on('connected', function () {
    //     console.log('Mongoose log connected to ' + dbURIlog);
    // });

    //--  Closing named connection
    // logDB.close(function () {
    //     console.log('Mongoose log disconnected');
    // });

/*
* Listen for Mongoose connection events and output statuses to console
**/
//-- Monitoring for successful connection through Mongoose
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});

//-- hecking for connection error
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

//-- Checking for disconnection event
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});



/*
* Close Mongoose connection, passing through an anonymous function to run when closed.
* Reusable function to close Mongoose connection
**/
//-- Define function to accept message and callback function
var gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        //-- Output message and call callback when Mongoose connection is closed
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};


/*
* Listen to Node processes for termination or restart signals,
* and call gracefulShutdown function when appropriate,
* passing a continuation callback
**/

//-- Listen for SIGUSR2, which is what nodemon uses
process.once('SIGUSR2', function () {
    //-- Send message to graceful-Shutdown and callback to kill process, emitting SIGUSR2 again
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});

//--Listen for SIGINT emitted on application termination
process.on('SIGINT', function () {
    //--  Send message to gracefulShutdown and callback to exit Node process
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});

//-- Listen for SIGTERM emitted when Heroku shuts down process
process.on('SIGTERM', function() {
    //--  Send message to gracefulShutdown and callback to exit Node process
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});

// global.models = require('./../app/models');