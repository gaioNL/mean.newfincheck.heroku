'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // Server port
  port:   process.env.OPENSHIFT_NODEJS_PORT ||
          process.env.PORT ||
          8080,
  // MongoDB connection options
  mongo: {
  	//: process.env.MONGOLAB_URI
    uri: process.env.MONGOLAB_URI || 'mongodb://localhost/newfincopen-dev'
  },

  // Seed database on startup
  seedDB: true

};
